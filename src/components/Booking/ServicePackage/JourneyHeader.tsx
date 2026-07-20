"use client";

import { Compass, Sparkles } from "lucide-react";

export default function JourneyHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 px-6 py-6">
      {/* decorative glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <Compass className="text-white" size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Service &amp; Package
            </h2>

            <p className="mt-0.5 text-sm text-blue-100">
              Choose the service you want to book for this trip.
            </p>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-blue-50 ring-1 ring-white/20 sm:flex">
          <Sparkles size={14} />
          Step 3 of 4
        </div>
      </div>
    </div>
  );
}