'use client';

import React from "react";
import { Button } from "@/components/livekit/button"; // you can keep your existing button or use the class below

interface WelcomeViewProps {
  startButtonText?: string;
  onStartCall: () => void;
}

export const WelcomeView = ({ startButtonText = "Start Adventure", onStartCall }: WelcomeViewProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 lavender-bg">
      <div className="max-w-2xl w-full lavender-card">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-14 w-14 rounded-full flex items-center justify-center" 
                 style={{ background: 'linear-gradient(90deg,var(--accent),var(--accent-3))', color: 'var(--button-text)', fontWeight: 700 }}>
              ♕
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold lavender-heading">
              The Princess of Willowmere
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              A short, friendly tale — help Princess Aurelia find a lost silver locket. Speak or type
              short actions like <span className="font-mono">"look at garden"</span> or <span className="font-mono">"ask the guard"</span>.
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--card-border)', background: 'transparent' }}>
                <div className="font-semibold">Explore</div>
                <div className="text-xs lavender-subtle">Search castle, garden, market.</div>
              </div>

              <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--card-border)', background: 'transparent' }}>
                <div className="font-semibold">Talk</div>
                <div className="text-xs lavender-subtle">Ask townsfolk for clues.</div>
              </div>

              <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--card-border)', background: 'transparent' }}>
                <div className="font-semibold">Decide</div>
                <div className="text-xs lavender-subtle">Make choices to shape the ending.</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {/* If you prefer to keep your existing Button component, you can add className below instead */}
              <button onClick={onStartCall} className="lavender-btn">
                {startButtonText}
              </button>
            </div>

            <p className="text-[12px] text-slate-400 mt-3">Hint: Keep actions short — the GM will ask “What do you do?”</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
