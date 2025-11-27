'use client';

import { Button } from "@/components/livekit/button";

interface WelcomeViewProps {
  onStartCall: () => void;
}

export const WelcomeView = ({ onStartCall }: WelcomeViewProps) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-sky-300 via-slate-100 to-white">
      <div className="max-w-xl space-y-3">
        <p className="text-xs tracking-[0.32em] uppercase text-sky-600">
          TrustLine Bank · Demo
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          TrustLine Fraud Alert Assistant
        </h1>

        <p className="text-sm md:text-base text-slate-600">
          A sandbox-only voice agent that simulates a fraud alert call from TrustLine Bank’s fraud
          monitoring team. Built for testing call flows and case updates.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full text-left">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Identify</h2>
          <p className="text-xs text-slate-600">
            Loads a fake fraud case from a JSON database once the user provides their first name.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Verify</h2>
          <p className="text-xs text-slate-600">
            Uses a simple security question from the case file for safe verification.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Decide</h2>
          <p className="text-xs text-slate-600">
            Marks the transaction as safe or fraudulent based on the caller’s response and updates the DB.
          </p>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-8 px-10 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-md"
        onClick={onStartCall}
      >
        Start Voice Fraud Check
      </Button>

      <p className="text-[11px] text-slate-500 mt-3">
        Training & demo only · Do not use with real customer data
      </p>
    </section>
  );
};

export default WelcomeView;