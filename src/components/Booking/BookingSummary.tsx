"use client";

import { Minus, Plus } from "lucide-react";

import type { GroupType } from "./GroupType/Grouptype";
import type { Package } from "./ServicePackage/types";
import type { BookingItem } from "../Booking";

type Props = {
  group: GroupType | null;
  pkg: Package | null;
  participants: number;

  items: BookingItem[];

  onIncrease: (serviceId: number) => void;
  onDecrease: (serviceId: number) => void;
};

export default function BookingSummary({
  group,
  pkg,
  participants,
  items,
  onIncrease,
  onDecrease,
}: Props) {
  // TOTAL CALCULATION
  const total = items.reduce((sum, item) => {
    const unitPrice = Number(item.service.prices?.[0]?.price ?? 0);
    return sum + unitPrice * item.quantity;
  }, 0);

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      {/* HEADER */}
      <div className="border-b p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Booking Summary
        </h2>
      </div>

      <div className="space-y-6 p-6">
        {/* BASIC DETAILS */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Group Type</span>
            <span className="font-medium">{group?.name ?? "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Package</span>
            <span className="font-medium">{pkg?.name ?? "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Participants</span>
            <span className="font-medium">{participants}</span>
          </div>
        </div>

        {/* CART */}
        <div className="border-t pt-6">
          <h3 className="mb-4 font-semibold text-gray-900">
            My Tickets
          </h3>

          {items.length === 0 ? (
            <p className="text-sm text-gray-400">
              No services selected
            </p>
          ) : (
            items.map((item) => {
              const unitPrice = Number(
                item.service.prices?.[0]?.price ?? 0
              );

              const subtotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.service.id}
                  className="mb-4 rounded-xl border p-4"
                >
                  {/* TOP */}
                  <div className="flex items-start justify-between">
                    {/* SERVICE INFO */}
                    <div>
                      <h4 className="font-semibold">
                        {item.service.service.name}
                      </h4>

                      <p className="mt-1 text-sm text-gray-500">
                        TZS {unitPrice.toLocaleString()}
                      </p>

                      {/* NEW: per service participants */}
                      <p className="mt-1 text-xs text-gray-400">
                        Participants: {item.participants}
                      </p>
                    </div>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onDecrease(item.service.id)}
                        className="rounded-md border p-2 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-[24px] text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => onIncrease(item.service.id)}
                        className="rounded-md border p-2 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* SUBTOTAL */}
                  <div className="mt-4 flex justify-between border-t pt-3">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">
                      TZS {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* TOTAL */}
        <div className="flex justify-between border-t pt-6 text-lg font-bold">
          <span>Total</span>
          <span>TZS {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}