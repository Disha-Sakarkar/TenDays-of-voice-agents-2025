# backend/src/agent.py
import logging
import os
from datetime import datetime, timezone
from typing import Dict, Any, List

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
    function_tool,
    RunContext,
)
from livekit.plugins import murf, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")
load_dotenv(".env.local")

# Config
DEFAULT_VOICE = "en-US-matthew"
MAX_TURNS = 14

# Simple, friendly system prompt for a princess adventure
PRELUDE = (
    "You are a gentle Game Master running a short, single-player fairy-tale adventure called "
    "\"The Princess of Willowmere\".\n\n"
    "UNIVERSE & TONE:\n"
    "- Setting: a small kingdom called Willowmere with a castle, a friendly forest, and a nearby hill where a lost relic is hidden.\n"
    "- Tone: warm, clear, and simple. Use short sentences the player can easily follow.\n\n"
    "ROLE & RULES:\n"
    "- You are the GM. Describe scenes, give simple choices, and always end each spoken message with a short question inviting the player to choose an action (for example: 'What do you do?').\n"
    "- Keep language simple and child-friendly: short sentences, clear options (explore, ask, take, open, climb, etc.).\n"
    "- Remember the player's recent choices so the story continues logically.\n"
    "- If the player asks to restart, call the tool `restart_adventure` to reset state. If they say they're done, give a short kind farewell and summary.\n\n"
    "SESSION GOAL:\n"
    "- Run a short mini-quest (8–14 exchanges): find the lost family locket, help the princess, and reach a small satisfying ending.\n"
)

class PrincessAgent(Agent):
    def __init__(self) -> None:
        super().__init__(instructions=PRELUDE)
        self.story_history: List[Dict[str, str]] = []
        self.turn_count: int = 0
        self.ended: bool = False
        self.seed = self._get_seed()

    def _get_seed(self) -> Dict[str, str]:
        return {
            "princess_name": "Aurelia",
            "kingdom": "Willowmere",
            "relic": "a small silver locket",
            "starting_place": "castle gardens",
        }

    def _append_history(self, who: str, text: str) -> None:
        self.story_history.append({"who": who, "text": text})
        if len(self.story_history) > 80:
            self.story_history = self.story_history[-80:]

    def _session_summary(self) -> str:
        # short summary of the last few turns
        lines = []
        for entry in self.story_history[-8:]:
            who = "GM" if entry["who"] == "gm" else "You"
            lines.append(f"{who}: {entry['text']}")
        return "\n".join(lines)

    # Tools available to LLM / system
    @function_tool
    async def restart_adventure(self, context: RunContext) -> Dict[str, Any]:
        """Reset the adventure to the original start state."""
        self.story_history = []
        self.turn_count = 0
        self.ended = False
        self.seed = self._get_seed()
        return {"ok": True, "message": "Adventure restarted."}

    @function_tool
    async def get_session_summary(self, context: RunContext) -> Dict[str, Any]:
        """Return a short recap of the recent conversation."""
        return {"summary": self._session_summary(), "turns": self.turn_count}

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()

async def entrypoint(ctx: JobContext):
    ctx.log_context_fields = {"room": ctx.room.name}
    gm = PrincessAgent()

    session = AgentSession(
        stt=deepgram.STT(model="nova-3"),
        llm=google.LLM(model="gemini-2.5-flash"),
        tts=murf.TTS(
            voice=DEFAULT_VOICE,
            tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
            text_pacing=True,
        ),
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        preemptive_generation=True,
    )

    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    # Start the agent session
    await session.start(
        agent=gm,
        room=ctx.room,
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    # give a concise log line
    logger.info("Princess adventure GM ready — Willowmere")

    await ctx.connect()

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
