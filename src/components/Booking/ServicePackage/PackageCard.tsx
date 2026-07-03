"use client";

import {
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";

import { Package } from "./types";

type Props = {
  package: Package;
  selected: boolean;
  onSelect: () => void;
};

export default function PackageCard({
  package: pkg,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        selected
          ? "border-blue-600 ring-2 ring-blue-100 bg-blue-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3">

            <h3 className="text-xl font-bold text-gray-900">
              {pkg.name}
            </h3>

            {pkg.recommended && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                Recommended
              </span>
            )}

          </div>

          <p className="mt-2 text-gray-500">
            {pkg.duration}
          </p>

        </div>

        {selected && (
          <BadgeCheck
            className="text-green-500"
            size={28}
          />
        )}

      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-3">

        {pkg.features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <CheckCircle2
              size={16}
              className="text-green-500"
            />

            {feature}
          </div>
        ))}

      </div>

      <div className="mt-8 flex justify-between items-center border-t pt-5">

        <div>

          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            {pkg.price}
          </h2>

        </div>

        <button
          type="button"
          className={`rounded-xl px-6 py-3 font-medium transition ${
            selected
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-blue-50"
          }`}
        >
          {selected ? "Selected" : "Select Package"}
        </button>

      </div>
    </div>
  );
}