"use client";

import { useMemo, useRef } from "react";
import { CalendarDays } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BookingDate({
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const formattedDate = useMemo(() => {
    if (!value) return "";

    return new Date(value).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [value]);

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.showPicker?.()}
        className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-2.5 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          <CalendarDays size={18} />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">
            Booking Date:
          </span>

          <span
            className={`font-semibold ${
              value ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {value ? formattedDate : "Select date"}
          </span>
        </div>
      </button>

      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="hidden"
      />
    </>
  );
}