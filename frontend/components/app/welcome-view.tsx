'use client';

import React from "react";
import { Button } from "@/components/livekit/button";

interface WelcomeViewProps {
  onStartCall: () => void;
}

export const WelcomeView = ({ onStartCall }: WelcomeViewProps) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-emerald-50 via-emerald-100 to-white">
      <img
        src="/zoho.png"
        alt="Zoho hero"
        className="w-44 h-44 object-contain mb-6 rounded-lg"
      />

      <h1 className="text-4xl font-bold text-foreground mb-2">Zoho Voice SDR</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-6">
        Hi — I’m Priya from Zoho. I can help you understand our apps, pricing model, and collect your details for a sales follow-up.
      </p>

      <div className="flex gap-3 max-w-3xl w-full justify-center mb-6">
        <div className="px-5 py-4 rounded-lg bg-white shadow-sm text-left">
          <h4 className="text-sm font-semibold">Who it's for</h4>
          <p className="text-xs text-muted-foreground">SMBs to enterprises seeking an integrated app suite.</p>
        </div>
        <div className="px-5 py-4 rounded-lg bg-white shadow-sm text-left">
          <h4 className="text-sm font-semibold">Getting started</h4>
          <p className="text-xs text-muted-foreground">Trials available; pricing depends on the product and plan.</p>
        </div>
      </div>

      <Button
        size="lg"
        className="px-10 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
        onClick={onStartCall}
      >
        Start Conversation with Priya
      </Button>

      <p className="text-[12px] mt-3 text-muted-foreground">Powered by Zoho-inspired UI • Murf Falcon TTS</p>
    </section>
  );
};

export default WelcomeView;