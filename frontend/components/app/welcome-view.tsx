"use client";

import React, { useState } from "react";
import { Button } from "@/components/livekit/button";

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ...props
}: React.ComponentProps<"div"> & WelcomeViewProps) => {
  const [name, setName] = useState("");

  const handleStart = () => {
    onStartCall();
  };

  return (
    <div
      {...props}
      className="
        min-h-screen w-full flex flex-col items-center justify-center px-6 py-10
        bg-gradient-to-b from-black via-zinc-900 to-black text-purple-300
      "
    >

      {/* Header */}
      <div className="max-w-2xl text-center space-y-4 mb-10">
        <h1 className="text-[13px] uppercase tracking-[0.4em] text-fuchsia-500 font-semibold">
          Welcome to the Neon Arena
        </h1>

        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-200 drop-shadow-lg">
          IMPROV BATTLE: VOICE EDITION
        </h2>

        <p className="text-sm md:text-base text-purple-400">
          Enter the arena. Face the AI host. Perform improvised scenes.
          Your voice is your only weapon.
        </p>
      </div>

      {/* Join Card */}
      <div className="w-full max-w-md bg-black/60 border border-purple-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
        <h3 className="text-lg font-semibold mb-3 text-purple-200">Contestant Entry</h3>

        <label className="flex flex-col gap-2 text-left mb-5">
          <span className="text-xs font-medium text-purple-400">
            What should the host call you?
          </span>
          <input
            type="text"
            placeholder="Disha, Annie, ShadowNova..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full px-3 py-2 rounded-2xl bg-black border border-purple-700
              text-purple-200 outline-none
              focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500
            "
          />
        </label>

        <Button
          onClick={handleStart}
          className="
            w-full py-3 rounded-2xl
            bg-gradient-to-r from-fuchsia-600 to-purple-700
            hover:from-fuchsia-500 hover:to-purple-600
            text-black font-semibold text-lg
          "
        >
          {startButtonText || "Start Improv Battle"}
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-6 max-w-lg text-center text-[12px] text-purple-500 space-y-1">
        <p>Say “end scene” when you're done improvising.</p>
        <p>Say “stop game” anytime to exit the show.</p>
      </div>
    </div>
  );
};

export default WelcomeView;