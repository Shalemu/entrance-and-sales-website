"use client";

import { Compass, CalendarDays } from "lucide-react";

export default function JourneyHeader() {
  const today = new Date();

  const currentDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const dayName = today.toLocaleDateString("en-GB", {
    weekday: "long",
  });

  return (
     <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
          <Compass className="text-white" size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Service & Package
          </h2>

          <p className="mt-0.5 text-sm text-blue-100">
            Choose the service you want to book for this trip.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="rounded-xl bg-white px-4 py-2.5 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
            <CalendarDays
              className="text-blue-600"
              size={18}
            />
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {currentDate}
            </h3>

            <p className="text-xs text-gray-500">
              {dayName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}