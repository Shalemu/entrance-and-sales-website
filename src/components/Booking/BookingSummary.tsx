"use client";

import { ArrowRight, CalendarDays, CreditCard, Minus, Plus, UsersRound } from "lucide-react";


import type { Package } from "./ServicePackage/types/types";
import type { BookingItem } from "../Booking";
import CheckoutButton from "./CheckoutButton";
import { calculateItemTotal } from "./utils/calculateItemTotal";


type Props = {
  customer?: any;
  pkg: Package | null;
  participants: number;
  items: BookingItem[];
  bookingDate: string;
  onIncrease: (serviceId: number) => void;
  onDecrease: (serviceId: number) => void;
  onCheckout: () => void;
   checkoutLoading: boolean;
  showCheckoutButton: boolean;
  checkoutLabel?: string;
};

export default function BookingSummary({


  pkg,
  participants,
  customer,
  items,
  bookingDate,

  onIncrease,
  onDecrease,

  onCheckout,
  checkoutLoading,
  showCheckoutButton,
  checkoutLabel,

}: Props) {
  const formattedBookingDate = bookingDate
    ? new Date(bookingDate).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not selected";
  
  
  const total = items.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  return (

    <div className="
      overflow-hidden
      rounded-2xl
      border
      border-gray-100
      bg-white
      shadow-sm
    ">
      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
        gap-3
        border-b
        border-gray-100
        bg-gradient-to-r
        from-gray-50
        to-white
        p-6
      ">
        <h2 className="
          text-xl
          font-bold
          text-gray-900
        ">
          Booking Summary
        </h2>

        {/* BOOKING DATE */}
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 py-1.5 pl-2.5 pr-3.5 transition-colors hover:border-blue-200">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
            <CalendarDays size={13} />
          </div>

          <span className="text-sm font-semibold text-blue-800">
            {formattedBookingDate}
          </span>
        </div>
      </div>
      <div className="
        space-y-6
        p-6
      ">

        {customer && (
        <div className="rounded-2xl border border-gray-200 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Delivery Info
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium text-gray-900">
                {customer.first_name} {customer.last_name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium text-gray-900">{customer.phone}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-900">{customer.email}</span>
            </div>
          </div>
        </div>
      )}
        {/* BASIC DETAILS */}
<div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-white p-4">

    {/* Icon */}
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
      <UsersRound size={18} />
    </div>


{/* Content */}
<div className="flex-1">

  <p className="text-xs text-gray-500">
    Group Type
  </p>


  <h3 className="mt-0.5 font-semibold text-gray-900">
    {customer?.group?.name ?? "Not Selected"}
  </h3>

</div>


    {/* Status Badge */}
    <div className="
      rounded-full
      bg-green-100
      px-3
      py-1
      text-xs
      font-medium
      text-green-700
    ">
      Active
    </div>

</div>
        {/* TICKETS */}
        <div className="
          border-t
          pt-6
        ">
          <h3 className="
            mb-4
            font-semibold
            text-gray-900
          ">
            My Tickets
          </h3>
          {
            items.length === 0 ?

            (

              <p className="
                text-sm
                text-gray-400
              ">
                No services selected
              </p>

            )

            :

            (
              items.map((item)=>{
             const unitPrice = Number(
              item.service?.prices?.[0]?.price ??
              item.package?.prices?.[0]?.price ??
              0
            );
                const subtotal = calculateItemTotal(item);
                return (
                  <div
                  key={
                    item.service?.id
                      ? `service-${item.service.id}`
                      : `package-${item.package?.id}`
                  }
                  className="
                    mb-4
                    rounded-2xl
                    border
                    border-gray-200
                    p-4
                    transition-shadow
                    hover:shadow-md
                  "
                >
                    {/* SERVICE HEADER */}
                    <div className="
                      flex
                      items-start
                      justify-between
                    ">
                      <div>
                        <h4 className="
                          font-semibold
                        ">
                          {
                           item.service?.service.name ??
                            item.package?.name ??
                            "Unknown Item"
                          }
                        </h4>
                      <p className="mt-1 text-sm text-gray-500">
                      TZS {unitPrice.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                      {
                      item.service
                      ? item.service.prices?.[0]?.price_mode
                      : item.package?.pricing_mode
                      }
                      </p>
                        <p className="
                          mt-1
                          text-xs
                          text-gray-400
                        ">
                          Participants: {item.participants}
                        </p>
                      </div>
                      {/* QUANTITY */}
                      <div className="
                        flex
                        items-center
                        gap-3
                      ">
                        <button

                          onClick={()=>
                            onDecrease(item.service?.id)
                          }

                          className="
                            rounded-full
                            border
                            border-gray-200
                            p-2
                            transition-colors
                            hover:bg-gray-100
                          "
                        >

                          <Minus size={16}/>

                        </button>
                        <span className="
                          min-w-[24px]
                          text-center
                          font-semibold
                        ">
                          {item.quantity}
                        </span>
                        <button
                          onClick={()=>
                            onIncrease(item.service?.id)
                          }

                          className="
                            rounded-full
                            bg-blue-600
                            p-2
                            text-white
                            transition-colors
                            hover:bg-blue-700
                          "
                        >
                          <Plus size={16}/>
                        </button>
                      </div>
                    </div>
                    {/* SERVICE BOOKING DETAILS */}

                    <div className="
                      mt-4
                      space-y-2
                      border-t
                      pt-4
                    ">
                      <h5 className="
                        text-sm
                        font-semibold
                        text-gray-900
                      ">
                        Booking Details
                      </h5>
                      <div className="
                        flex
                        justify-between
                        text-sm
                      ">
                        <span className="text-gray-500">
                          Date
                        </span>
                        <span>
                          {item.bookingDate}
                        </span>
                      </div>
                      <div className="
                        flex
                        justify-between
                        text-sm
                      ">
                        <span className="text-gray-500">
                          Time
                        </span>
                        <span>
                          {item.startTime} - {item.endTime}
                        </span>
                      </div>
                      <div className="
                        flex
                        justify-between
                        text-sm
                      ">
                        <span className="text-gray-500">
                          Adults
                        </span>
                        <span>
                          {item.adults ?? 0}
                        </span>
                      </div>
                      <div className="
                        flex
                        justify-between
                        text-sm
                      ">
                        <span className="text-gray-500">
                          Children
                        </span>
                        <span>
                          {item.children ?? 0}
                        </span>
                      </div>
                    </div>
                    {/* SUBTOTAL */}
                    <div className="
                      mt-4
                      flex
                      justify-between
                      border-t
                      pt-3
                    ">
                      <span className="text-gray-500">
                        Subtotal
                      </span>
                      <span className="font-semibold">
                        TZS {subtotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )
          }
        </div>
{/* TOTAL */}
<div className="
  border-t
  border-gray-100
  pt-6
  space-y-4
">

  <div className="
    flex
    items-center
    justify-between
    rounded-2xl
    bg-gradient-to-r
    from-blue-50
    to-white
    px-4
    py-3
    text-lg
    font-bold
    text-gray-900
  ">
    <span>
      Total
    </span>

    <span>
      TZS {total.toLocaleString()}
    </span>
  </div>


{
  showCheckoutButton && (
    <CheckoutButton

    disabled={items.length===0}

    loading={checkoutLoading}

    onClick={onCheckout}

    label={checkoutLabel}

    />
  )
}

</div>
      </div>
    </div>
  );
}