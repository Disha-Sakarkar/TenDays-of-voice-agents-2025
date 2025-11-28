'use client';

import React from "react";
import { Button } from "@/components/livekit/button";

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({ startButtonText, onStartCall }: WelcomeViewProps) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-amber-500 via-orange-50 to-white">
      <div className="max-w-xl space-y-3">
        <p className="text-xs tracking-[0.3em] uppercase text-orange-500">
          QuickBasket · Voice Ordering
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Order Food & Groceries with Your Voice
        </h1>

        <p className="text-sm md:text-base text-slate-600">
          I’m your QuickBasket assistant. I can add groceries, snacks, and simple meal ingredients
          to your cart — and even grab everything you need for a pasta dinner or a peanut butter sandwich.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full text-left">
        <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Groceries</h2>
          <p className="text-xs text-slate-600">
            Bread, milk, eggs, fruits and kitchen essentials — just ask and I’ll add them to your cart.
          </p>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Snacks & Ready-to-Eat</h2>
          <p className="text-xs text-slate-600">
            Chips, noodles, pizzas and quick bites for late-night cravings or study sessions.
          </p>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Smart Ingredients</h2>
          <p className="text-xs text-slate-600">
            Say things like “ingredients for a peanut butter sandwich” and I’ll bundle everything for you.
          </p>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-8 px-10 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md"
        onClick={onStartCall}
      >
        {startButtonText || "Start Ordering"}
      </Button>

      <p className="text-[11px] text-slate-500 mt-3">
        Demo experience · No real payments or deliveries
      </p>
    </section>
  );
};

export default WelcomeView;