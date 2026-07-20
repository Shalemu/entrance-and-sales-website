"use client";

import React from "react";
import { Trash2 } from "lucide-react";

type Props = {
  item?: any;
  removeItemFromCart: (id: number) => void;
};

export default function SingleItem({
  item,
  removeItemFromCart,
}: Props) {

  // Prevent crash if item is undefined
  if (!item) {
    return null;
  }


  const name =
    item.service?.name ??
    item.package?.name ??
    "Booking Item";


  const price = Number(
    item.service?.prices?.[0]?.price ??
    item.package?.prices?.[0]?.price ??
    item.price ??
    0
  );


  const id =
    item.service?.id ??
    item.package?.id ??
    item.id;


  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5
        border-b
        border-gray-200
        pb-5
      "
    >

      {/* Details */}
      <div className="space-y-1">


        <h3
          className="
            font-semibold
            text-gray-900
          "
        >
          {name}
        </h3>


        <p className="text-sm text-gray-600">
          Price:
          <span className="ml-1 font-medium">
            TZS {price.toLocaleString()}
          </span>
        </p>


        <p className="text-sm text-gray-500">
          Participants:
          <span className="ml-1">
            {item.participants ?? 0}
          </span>
        </p>


        <p className="text-sm text-gray-500">
          Qty:
          <span className="ml-1">
            {item.quantity ?? 1}
          </span>
        </p>


        {
          item.bookingDate && (
            <p className="text-sm text-gray-500">
              Date:
              <span className="ml-1">
                {item.bookingDate}
              </span>
            </p>
          )
        }


        {
          item.startTime && (
            <p className="text-sm text-gray-500">
              Time:
              <span className="ml-1">
                {item.startTime}
              </span>
            </p>
          )
        }


      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => {

          if (id) {
            removeItemFromCart(id);
          }

        }}
        aria-label="Remove item"
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          text-gray-400
          transition-colors
          hover:bg-red-50
          hover:text-red-600
        "
      >
        <Trash2 size={17} />
      </button>

    </div>
  );
}