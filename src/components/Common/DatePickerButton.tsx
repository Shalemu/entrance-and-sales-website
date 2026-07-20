"use client";

import { useMemo, useRef } from "react";
import { CalendarDays } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  label?: string;
  min?: string;
  className?: string;
};

const sizeClasses = {
  sm: {
    wrapper: "gap-3 px-3.5 py-2",
    icon: "h-8 w-8",
    iconSize: 15,
    text: "text-sm",
  },
  md: {
    wrapper: "gap-4 px-5 py-2.5",
    icon: "h-9 w-9",
    iconSize: 18,
    text: "text-sm",
  },
  lg: {
    wrapper: "gap-4 px-6 py-3.5",
    icon: "h-12 w-12",
    iconSize: 22,
    text: "text-base",
  },
} as const;

export default function DatePickerButton({
  value,
  onChange,
  size = "md",
  label = "Booking Date",
  min,
  className = "",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const s = sizeClasses[size];

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
        onClick={() =>
          inputRef.current?.showPicker
            ? inputRef.current.showPicker()
            : inputRef.current?.click()
        }
        className={`group flex w-full items-center rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-400 hover:shadow-md ${s.wrapper} ${className}`}
      >
        <div
          className={`flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-sm transition group-hover:scale-105 ${s.icon}`}
        >
          <CalendarDays size={s.iconSize} />
        </div>

        <div className={`flex flex-1 items-center gap-2 whitespace-nowrap ${s.text}`}>
          <span className="font-medium text-gray-500">
            {label}:
          </span>

          <span
            className={`font-semibold ${value ? "text-gray-900" : "text-gray-400"}`}
          >
            {value ? formattedDate : "Select date"}
          </span>
        </div>
      </button>

      <input
        ref={inputRef}
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="hidden"
      />
    </>
  );
}
