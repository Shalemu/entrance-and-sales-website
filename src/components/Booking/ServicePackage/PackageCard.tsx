"use client";

import { CheckCircle2, Plus, X } from "lucide-react";
import { Package } from "./types";
import { getActivePrices, getCurrentPricingRule } from "./utils/pricing";

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
  const rule = getCurrentPricingRule();
  const activePrices = getActivePrices(pkg.prices || [], rule);

  const price = activePrices[0] || pkg.prices?.[0];

  const hasRange =
    price?.minimum_quantity != null &&
    price?.maximum_quantity != null;

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl border p-6 transition hover:shadow-lg ${
        selected ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">{pkg.name}</h3>

        {selected && <CheckCircle2 size={20} className="text-blue-600" />}
      </div>

      <p className="text-sm text-gray-500">{pkg.package_type?.name}</p>

      <div className="mt-4 border-t pt-4">
        <p className="text-lg font-semibold">
          TZS {Number(price?.price || 0).toLocaleString()}
        </p>

        <p className="text-sm text-gray-600">
          {hasRange
            ? `${price.minimum_quantity} - ${price.maximum_quantity} guests`
            : "Flat package"}
        </p>

        <p className="text-xs text-gray-400">
          {price?.pricing_rule}
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className={`rounded-xl px-5 py-2 text-sm font-medium ${
            selected
              ? "bg-blue-600 text-white"
              : "bg-gray-900 text-white hover:bg-blue-600"
          }`}
        >
          {selected ? "Added" : "Add Package"}
        </button>
      </div>
    </div>
  );
}