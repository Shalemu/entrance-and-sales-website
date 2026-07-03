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
    <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-6">

      {/* Left */}
      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
          <Compass className="text-white" size={30} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            Service & Package
          </h2>

          <p className="mt-1 text-blue-100">
            Choose the service you want to book for this trip.
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="rounded-2xl bg-white px-6 py-4 shadow-lg">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
            <CalendarDays
              className="text-blue-600"
              size={22}
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {currentDate}
            </h3>

            <p className="text-sm text-gray-500">
              {dayName}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}