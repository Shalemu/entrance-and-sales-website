"use client";

import React from "react";

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
        onClick={() => {

          if(id){
            removeItemFromCart(id);
          }

        }}
        className="
          rounded-lg
          bg-red-500
          px-3
          py-2
          text-sm
          font-medium
          text-white
          transition
          hover:bg-red-600
        "
      >
        Remove
      </button>


    </div>
  );
}