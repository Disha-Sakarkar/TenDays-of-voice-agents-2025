"use client";

import React from "react";
import { Button } from "@/components/livekit/button";

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({ startButtonText, onStartCall }: WelcomeViewProps) => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 py-10 bg-[#F8F6F1] text-[#1E1E1E] bg-gradient-to-br from-[#FFFDFC] via-[#FFECEC] to-[#FFD8D8]">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-xs tracking-[0.3em] uppercase text-[#E31837]/80">
          Café Coffee Day · Murf Falcon
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1E1E1E]">
          Your CCD AI Barista
        </h1>

        <p className="text-sm md:text-base text-[#1E1E1E]/70">
          Welcome to Café Coffee Day's virtual barista powered by Murf Falcon,
          the fastest TTS API. Speak your coffee order and I&apos;ll confirm the size,
          milk, extras and save it for you.
        </p>

        <div className="rounded-xl border border-[#E31837]/30 bg-[#FFFFFF]/60 px-4 py-3 text-xs md:text-sm text-left text-[#1E1E1E]/80 shadow-sm">
          Try saying:
          <br />
          “I want a large cappuccino with almond milk and chocolate drizzle.
          My name is Disha.”
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCall}
            className="mt-3 w-64 rounded-full font-medium bg-[#E31837] text-white hover:bg-[#c7122f]"
          >
            {startButtonText || "Order Coffee with AI Barista"}
          </Button>
        </div>

        <p className="text-[11px] text-[#1E1E1E]/50">
          Built for the Murf AI Voice Agent Challenge · #MurfAIVoiceAgentsChallenge
        </p>
      </div>
    </div>
  );
};

export default WelcomeView;
