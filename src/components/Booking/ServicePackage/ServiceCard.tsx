"use client";

import { CheckCircle2, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { BranchService } from "./types";
import { getActivePrices, getCurrentPricingRule } from "./utils/pricing";

type Props = {
  service: BranchService;
  quantity: number;
  participants: number;
  onParticipantsChange: (value: number) => void;
  onAdd: () => void;
  onRemove: () => void;
};

export default function ServiceCard({
  service,
  quantity,
  participants,
  onParticipantsChange,
  onAdd,
  onRemove,
}: Props) {
  const rule = getCurrentPricingRule();

  const activePrices = getActivePrices(service.prices || [], rule);

  const price = activePrices?.[0] ?? service.prices?.[0];
  const unitPrice = Number(price?.price || 0);

  const min = price?.minimum_quantity ?? 1;
  const max = price?.maximum_quantity ?? 999;

  const total = unitPrice * quantity;
  const isInCart = quantity > 0;

  const [inputValue, setInputValue] = useState<string>(
    participants ? String(participants) : ""
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInputValue(participants ? String(participants) : "");
  }, [participants]);

  const handleChange = (raw: string) => {
    setInputValue(raw);

    if (raw === "") {
      setError(null);
      return;
    }

    const value = Number(raw);
    if (isNaN(value)) return;

    if (value < min || value > max) {
      setError(`Allowed: ${min} - ${max}`);
    } else {
      setError(null);
      onParticipantsChange(value);
    }
  };

  const handleBlur = () => {
    if (inputValue === "") {
      setInputValue(String(min));
      onParticipantsChange(min);
      setError(null);
    }
  };

  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg ${
        isInCart ? "border-blue-500/40 ring-1 ring-blue-100" : "border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {service.service.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {service.service.description ?? "No description available"}
          </p>
        </div>

        {isInCart && (
          <CheckCircle2 size={20} className="text-blue-600 mt-1" />
        )}
      </div>

      {/* PARTICIPANTS (MOVED TO TOP) */}
      {isInCart && (
        <div className="mt-4 rounded-xl bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Participants
              </p>
              <p className="text-xs text-gray-500">
                Allowed: {min} - {max}
              </p>
            </div>

            <input
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              className={`w-24 rounded-lg border px-3 py-1 text-center text-sm outline-none ${
                error ? "border-red-400" : "border-gray-200"
              }`}
            />
          </div>

          {error && (
            <p className="mt-2 text-xs text-red-500">{error}</p>
          )}
        </div>
      )}

      {/* PRICE (CLEAN, NO RULE BADGE) */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">Price per booking</p>
          <p className="text-xl font-semibold text-gray-900">
            TZS {unitPrice.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Subtotal</p>
          <p className="text-lg font-semibold text-gray-900">
            TZS {total.toLocaleString()}
          </p>
        </div>
      </div>

      {/* CART CONTROLS */}
      <div className="mt-6 flex items-center justify-between">
        {isInCart ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onRemove}
              className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-[28px] text-center font-semibold">
              {quantity}
            </span>

            <button
              onClick={onAdd}
              className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-blue-50"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={onAdd}
            className="ml-auto rounded-xl bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}