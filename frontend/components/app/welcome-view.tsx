"use client";

import { Button } from "@/components/livekit/button";

interface WelcomeViewProps {
  onStartCall: () => void;
}

export const WelcomeView = ({ onStartCall }: WelcomeViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10 text-center space-y-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      <div className="space-y-3">
        <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
          StudyPulse · Voice Tutor
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
          Learn, Get Quizzed, Teach Back
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
          StudyPulse is a voice-first active recall coach. It explains concepts, quizzes you,
          and listens as you teach the topic back to solidify your understanding.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full text-left">
        <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50 mb-1">Learn</h2>
          <p className="text-xs text-slate-300">
            Get short, clear explanations of each concept with simple examples.
          </p>
        </div>
        <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50 mb-1">Quiz</h2>
          <p className="text-xs text-slate-300">
            Answer targeted questions and get quick feedback on how you’re doing.
          </p>
        </div>
        <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50 mb-1">Teach Back</h2>
          <p className="text-xs text-slate-300">
            Explain the topic in your own words and receive gentle, qualitative feedback.
          </p>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-4 px-10 py-6 rounded-2xl font-semibold bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg"
        onClick={onStartCall}
      >
        Start Voice Session
      </Button>

      <p className="text-[11px] text-slate-400 mt-2">
        Powered by Murf Falcon TTS · LiveKit Agents
      </p>
    </div>
  );
};

export default WelcomeView;