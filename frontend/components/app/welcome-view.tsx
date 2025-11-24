"use client";

import React from "react";
import { Button } from "@/components/livekit/button";

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({ startButtonText, onStartCall }: WelcomeViewProps) => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 py-10 bg-[#F4FFFD] bg-gradient-to-br from-[#F4FFFD] via-[#E0F8F5] to-[#C4F0E9] text-[#102A27]">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-xs tracking-[0.3em] uppercase text-[#10847E]/80">
          PharmEasy · Murf Falcon
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Your Daily Wellness Voice Companion
        </h1>

        <p className="text-sm md:text-base text-[#102A27]/75">
          I am a calm, supportive wellness companion inspired by PharmEasy and powered
          by Murf Falcon, the fastest TTS API. Each day, I will check in on your mood,
          energy and simple goals, then save a short reflection so we can track how
          things evolve over time.
        </p>

        <div className="rounded-xl border border-[#10847E]/20 bg-white/80 px-4 py-3 text-xs md:text-sm text-left text-[#102A27]/80 shadow-sm">
          Try saying:
          <br />
          “Today I&apos;m feeling a bit tired but motivated. I want to finish my tasks and
          take a short walk. What do you suggest?”
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCall}
            className="mt-3 w-64 rounded-full font-medium bg-[#10847E] text-white hover:bg-[#0c6b66]"
          >
            {startButtonText || "Start today’s wellness check-in"}
          </Button>
        </div>

        <p className="text-[11px] text-[#102A27]/55">
          Built for the Murf AI Voice Agent Challenge · #MurfAIVoiceAgentsChallenge
        </p>
      </div>
    </div>
  );
};

export default WelcomeView;
