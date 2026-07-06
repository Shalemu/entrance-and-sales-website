"use client";

import { Headphones } from "lucide-react";

export default function SupportCard() {
  return (
    <a
      href="tel:+255767983236"
      className="hidden xl:flex items-center gap-3 hover:text-blue-600 transition-colors"
    >
      <Headphones
        size={22}
        className="text-blue-600"
      />

      <div className="leading-tight">
        <p className="text-[11px] uppercase tracking-widest text-gray-500">
          24/7 Support
        </p>

        <p className="text-sm font-semibold text-gray-900">
          +255 767 983 236
        </p>
      </div>
    </a>
  );
}