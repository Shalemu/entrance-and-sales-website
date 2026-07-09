"use client";

import { ArrowRight, CreditCard, Minus, Plus, UsersRound } from "lucide-react";

import type { GroupType } from "./GroupType/Grouptype";
import type { Package } from "./ServicePackage/types/types";
import type { BookingItem } from "../Booking";
import CheckoutButton from "./CheckoutButton";


type Props = {
  group: GroupType | null;
  customer?: any;
  pkg: Package | null;
  participants: number;
  items: BookingItem[];
  onIncrease: (serviceId: number) => void;
  onDecrease: (serviceId: number) => void;
  onCheckout: () => void; 
   checkoutLoading: boolean; 
};

export default function BookingSummary({

  group,
  pkg,
  participants,
  customer,
  items,

  onIncrease,
  onDecrease,
  
  onCheckout,
  checkoutLoading, 

}: Props) {
  
  
  const calculateItemTotal = (item: BookingItem) => {

  const priceInfo =
    item.service?.prices?.[0] ??
    item.package?.prices?.[0];


  const price = Number(
    priceInfo?.price ?? 0
  );



  const priceMode =
    item.service?.prices?.[0]?.price_mode ??
    item.package?.pricing_mode ??
    "fixed";


  switch(priceMode){


    case "fixed":

      return price * item.quantity;



    case "per_person":

      return (
        price *
        item.participants *
        item.quantity
      );



    case "per_adult_child":

      return (
        price *
        (
          (item.adults ?? 0) +
          (item.children ?? 0)
        ) *
        item.quantity
      );



    default:

      return price * item.quantity;

  }

};

  const total = items.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  return (

    <div className="
      rounded-2xl
      border
      bg-white
      shadow-sm
    ">
      {/* HEADER */}

      <div className="
        border-b
        p-6
      ">
        <h2 className="
          text-xl
          font-bold
          text-gray-900
        ">
          Booking Summary
        </h2>
      </div>
      <div className="
        space-y-6
        p-6
      ">
        
        {customer && (
        <div className="border-t pt-6">
          <h3 className="mb-3 font-semibold">
           DELIVERY INFO
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Name</span>
              <span>
                {customer.first_name} {customer.last_name}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Phone</span>
              <span>{customer.phone}</span>
            </div>

            <div className="flex justify-between">
              <span>Email</span>
              <span>{customer.email}</span>
            </div>
          </div>
        </div>
      )}
        {/* BASIC DETAILS */}
<div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-white p-5">

  <div className="flex items-center gap-4">

    {/* Icon */}
    <div className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-xl
      bg-blue-600
      text-white
      shadow-sm
    ">
      <UsersRound size={22} />
    </div>


    {/* Content */}
    <div className="flex-1">

      <p className="
        text-sm
        text-gray-500
      ">
        Group Type
      </p>


      <h3 className="
        mt-1
        text-lg
        font-semibold
        text-gray-900
      ">
        {group?.name ?? "Not Selected"}
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
                    rounded-xl
                    border
                    p-4
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
                            rounded-md
                            border
                            p-2
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
                            rounded-md
                            bg-blue-600
                            p-2
                            text-white
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
  pt-6
  space-y-4
">

  <div className="
    flex
    justify-between
    text-lg
    font-bold
  ">
    <span>
      Total
    </span>

    <span>
      TZS {total.toLocaleString()}
    </span>
  </div>


<CheckoutButton

disabled={items.length===0}

loading={checkoutLoading}

onClick={onCheckout}

/>

</div>
      </div>
    </div>
  );
}