"use client";

import Link from "next/link";
import { SearchCheck } from "lucide-react";

export default function BookingTracker() {
  return (
    <Link
      href="/booking"
      className="hidden xl:flex items-center gap-3 hover:text-blue-600 transition-colors"
    >
      <SearchCheck
        size={22}
        className="text-blue-600"
      />

      <div className="leading-tight">
        <p className="text-[11px] uppercase tracking-widest text-gray-500">
          Booking
        </p>

        <p className="text-sm font-semibold text-gray-900">
          Track Reservation
        </p>
      </div>
    </Link>
  );
}