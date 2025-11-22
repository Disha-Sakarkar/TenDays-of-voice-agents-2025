import logging

from dotenv import load_dotenv
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    WorkerOptions,
    cli,
    metrics,
    tokenize,
    # function_tool,
    # RunContext
)
from livekit.plugins import murf, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

load_dotenv(".env.local")


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a helpful voice AI assistant. The user is interacting with you via voice, even if you perceive the conversation as text.
            You eagerly assist users with their questions by providing information from your extensive knowledge.
            Your responses are concise, to the point, and without any complex formatting or punctuation including emojis, asterisks, or other symbols.
            You are curious, friendly, and have a sense of humor.""",
        )

    # To add tools, use the @function_tool decorator.
    # Here's an example that adds a simple weather tool.
    # You also have to add `from livekit.agents import function_tool, RunContext` to the top of this file
    # @function_tool
    # async def lookup_weather(self, context: RunContext, location: str):
    #     """Use this tool to look up current weather information in the given location.
    #
    #     If the location is not supported by the weather service, the tool will indicate this. You must tell the user the location's weather is unavailable.
    #
    #     Args:
    #         location: The location to look up weather information for (e.g. city name)
    #     """
    #
    #     logger.info(f"Looking up weather for {location}")
    #
    #     return "sunny with a temperature of 70 degrees."


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    # Logging setup
    # Add any other context you want in all log entries here
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # Set up a voice AI pipeline using OpenAI, Cartesia, AssemblyAI, and the LiveKit turn detector
    session = AgentSession(
        # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
        # See all available models at https://docs.livekit.io/agents/models/stt/
        stt=deepgram.STT(model="nova-3"),
        # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
        # See all available models at https://docs.livekit.io/agents/models/llm/
        llm=google.LLM(
                model="gemini-2.5-flash",
            ),
        # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
        # See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
        tts=murf.TTS(
                voice="en-US-matthew", 
                style="Conversation",
                tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
                text_pacing=True
            ),
        # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
        # See more at https://docs.livekit.io/agents/build/turns
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        # allow the LLM to generate a response while waiting for the end of turn
        # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
        preemptive_generation=True,
    )

    # To use a realtime model instead of a voice pipeline, use the following session setup instead.
    # (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    # 1. Install livekit-agents[openai]
    # 2. Set OPENAI_API_KEY in .env.local
    # 3. Add `from livekit.plugins import openai` to the top of this file
    # 4. Use the following session setup instead of the version above
    # session = AgentSession(
    #     llm=openai.realtime.RealtimeModel(voice="marin")
    # )

    # Metrics collection, to measure pipeline performance
    # For more information, see https://docs.livekit.io/agents/build/metrics/
    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    # # Add a virtual avatar to the session, if desired
    # # For other providers, see https://docs.livekit.io/agents/models/avatar/
    # avatar = hedra.AvatarSession(
    #   avatar_id="...",  # See https://docs.livekit.io/agents/models/avatar/plugins/hedra
    # )
    # # Start the avatar and wait for it to join
    # await avatar.start(session, room=ctx.room)

    # Start the session, which initializes the voice pipeline and warms up the models
    await session.start(
        agent=Assistant(),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            # For telephony applications, use `BVCTelephony` for best results
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    # Join the room and connect to the user
    await ctx.connect()


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))

# --------- BaristaAgent tools (Day 2) ---------
# Add this block at the end of backend/src/agent.py

from typing import Any, Dict, List, Optional
try:
    from livekit.agents import Agent, function_tool, RunContext
except Exception:
    # If the import path differs in your repo, keep the local import style used above in this file.
    # The class below expects the repo's Agent base and function_tool decorator to be available.
    Agent = object
    def function_tool(*args, **kwargs):
        def inner(fn):
            return fn
        return inner
    class RunContext(dict):
        pass

# Simple coffee menu (you can edit items/prices later)
_BEVERAGE_MENU = [
    {"id": "c01", "name": "Espresso", "price": 120},
    {"id": "c02", "name": "Americano", "price": 140},
    {"id": "c03", "name": "Cappuccino", "price": 170},
    {"id": "c04", "name": "Latte", "price": 170},
    {"id": "c05", "name": "Cold Brew", "price": 180},
]

class BaristaAgent(Agent):
    """
    BaristaAgent — Day 2 Coffee Shop agent tools:
    - get_menu(): returns menu
    - start_order(customer_name): creates session order state
    - add_item(item_id, qty): adds item(s) to session order
    - confirm_order(pickup_type): finalizes order
    - handoff_to_cashier(): returns a handoff payload with order details
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # friendly default instructions; LiveKit agent runner may use this
        try:
            self.instructions = "You are a friendly coffee shop barista. Take orders, confirm them, and hand off to cashier when asked."
        except Exception:
            pass

    @function_tool(name="get_menu", description="Return the coffee shop beverage menu")
    async def get_menu(self, context: RunContext) -> Dict[str, Any]:
        # Return menu as a serializable dict
        return {"menu": _BEVERAGE_MENU}

    @function_tool(name="start_order", description="Start a new order for a customer")
    async def start_order(self, context: RunContext, customer_name: Optional[str] = None) -> Dict[str, Any]:
        if not hasattr(context, "session_state") and isinstance(context, dict):
            # ensure session_state exists on context (for different runtimes)
            context.setdefault("session_state", {})
        session = getattr(context, "session_state", context.get("session_state", {}))

        session["order"] = {"customer": customer_name or "Guest", "items": [], "total": 0, "status": "started"}
        # persist back if needed
        if isinstance(context, dict):
            context["session_state"] = session
        else:
            context.session_state = session
        return {"status": "started", "order": session["order"]}

    @function_tool(name="add_item", description="Add an item (by id) and quantity to the current order")
    async def add_item(self, context: RunContext, item_id: str, qty: int = 1) -> Dict[str, Any]:
        # find item
        item = next((m for m in _BEVERAGE_MENU if m["id"] == item_id or m["name"].lower() == item_id.lower()), None)
        if not item:
            return {"error": f"Item '{item_id}' not found. Use get_menu to see available items."}

        # get or create order in session_state
        session = getattr(context, "session_state", context.get("session_state", {}))
        order = session.get("order", {"customer": "Guest", "items": [], "total": 0})
        line = {"id": item["id"], "name": item["name"], "price": item["price"], "qty": int(qty)}
        order["items"].append(line)
        order["total"] = sum(i["price"] * i["qty"] for i in order["items"])
        session["order"] = order

        # persist
        if isinstance(context, dict):
            context["session_state"] = session
        else:
            context.session_state = session

        return {"order": order}

    @function_tool(name="confirm_order", description="Confirm and finalize the order")
    async def confirm_order(self, context: RunContext, pickup_type: str = "counter") -> Dict[str, Any]:
        session = getattr(context, "session_state", context.get("session_state", {}))
        order = session.get("order")
        if not order:
            return {"error": "No active order to confirm. Start an order first."}

        order["status"] = "confirmed"
        order["pickup_type"] = pickup_type
        # (In a production flow, we would create a kitchen ticket or call payment here)
        session["order"] = order

        if isinstance(context, dict):
            context["session_state"] = session
        else:
            context.session_state = session

        return {
            "message": f"Order confirmed for {order.get('customer','Guest')}. Total ₹{order.get('total',0)}",
            "order": order
        }

    @function_tool(name="handoff_to_cashier", description="Create a handoff payload for a human cashier or cashier-agent")
    async def handoff_to_cashier(self, context: RunContext) -> Dict[str, Any]:
        session = getattr(context, "session_state", context.get("session_state", {}))
        order = session.get("order", {})
        handoff_payload = {
            "type": "order_handoff",
            "order": order,
            "notes": "Handoff created by BaristaAgent. Cashier to collect payment and complete the order."
        }
        # return the handoff payload so the runner or frontend can send it to cashier agent/UI
        return {"handoff": handoff_payload}

# End of BaristaAgent block
