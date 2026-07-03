"use client";

import { CheckCircle2 } from "lucide-react";

type SuccessCardProps = {
  title: string;
  message: string;
};

export default function SuccessCard({
  title,
  message,
}: SuccessCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-green-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5">
        <div className="flex items-center gap-3 text-white">
          <CheckCircle2 size={28} />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </div>

      <div className="p-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <p className="mt-6 text-gray-600 text-base">
          {message}
        </p>

        {/* Loading animation */}
        <div className="mt-8 w-56 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full w-full bg-green-500 animate-pulse" />
        </div>

        <span className="mt-4 text-sm text-gray-400">
          Please wait...
        </span>
      </div>
    </div>
  );
}