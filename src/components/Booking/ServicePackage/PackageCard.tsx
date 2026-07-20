"use client";

import {
  CheckCircle2,
  Plus,
  Minus,
  Users,
  CalendarDays,
  Package as PackageIcon,
} from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

import { Package } from "./types/types";

import BookingDateModal, {
  BookingData,
} from "./BookingModal/BookingDateModal";

type Props = {
  package: Package;
  selected: boolean;
  quantity: number;

  onAdd: (booking: BookingData) => void;
  onRemove: () => void;
};

export default function PackageCard({
  package: pkg,
  selected,
  quantity,
  onAdd,
  onRemove,
}: Props) {
  const [open, setOpen] = useState(false);

  const price = pkg.prices?.[0];

  const unitPrice = Number(
    price?.price ?? 0
  );

  return (
    <>
      <div
        className={`
          rounded-3xl
          border
          bg-white
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:shadow-xl
          ${
            selected
              ? "border-blue-600 ring-2 ring-blue-100"
              : "border-gray-200"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-xl font-bold text-gray-900">
              {pkg.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {pkg.package_type?.name}
            </p>

          </div>

          {selected && (
            <CheckCircle2
              size={22}
              className="text-blue-600"
            />
          )}

        </div>

        {/* Price */}

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">

          <p className="text-2xl font-bold text-slate-900">
            TZS {unitPrice.toLocaleString()}
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {pkg.pricing_mode === "per_person"
              ? "Per Person"
              : "Fixed Package"}
          </p>

          {price?.pricing_rule && (
            <p className="mt-1 text-xs text-slate-400">
              {price.pricing_rule}
            </p>
          )}

        </div>

        {/* Guests */}

        <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">

          <Users size={16} />

          <span>
            {pkg.minimum_guests} - {pkg.maximum_guests} Guests
          </span>

        </div>

{/* Included Services */}

{pkg.items?.length > 0 && (

  <div className="mt-6">

    <div className="mb-3 flex items-center gap-2">

      <PackageIcon
        size={18}
        className="text-blue-600"
      />

      <h4 className="font-semibold text-gray-900">
        Included Services
      </h4>

    </div>

    <div className="flex flex-wrap gap-2">

      {pkg.items.map((item) => (

        <div
          key={item.id}
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-slate-200
            bg-slate-50
            px-3
            py-2
            transition
            hover:bg-slate-100
          "
        >

          <CheckCircle2
            size={15}
            className="text-green-600"
          />

          <span className="text-sm font-medium text-slate-700">
            {item.service_name}
          </span>

          {item.quantity > 1 && (
            <span
              className="
                rounded-full
                bg-blue-600
                px-2
                py-0.5
                text-[11px]
                font-semibold
                text-white
              "
            >
              ×{item.quantity}
            </span>
          )}

        </div>

      ))}

    </div>

  </div>

)}

        {/* Action */}

        <div className="mt-6 flex justify-end">

          {selected ? (

            <div className="flex items-center gap-3">

              <button
                onClick={onRemove}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                "
              >
                <Minus size={16} />
              </button>

              <span className="font-semibold">
                {quantity}
              </span>

              <button
                onClick={() => setOpen(true)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                  text-white
                "
              >
                <Plus size={16} />
              </button>

            </div>

          ) : (

            <button
              onClick={() => setOpen(true)}
              className="
                rounded-xl
                bg-slate-900
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-slate-800
              "
            >
              Add Package
            </button>

          )}

        </div>

      </div>

      <BookingDateModal
        open={open}
        serviceName={pkg.name}
        minParticipants={
          pkg.minimum_guests ?? 1
        }
        maxParticipants={
          pkg.maximum_guests ?? 999
        }
        defaultParticipants={
          pkg.minimum_guests ?? 1
        }
        priceMode={pkg.pricing_mode}
        onClose={() => setOpen(false)}
        onConfirm={async (booking) => {

          await onAdd(booking);

          toast.success(
            `${pkg.name} added to cart`
          );

        }}
      />
    </>
  );
}