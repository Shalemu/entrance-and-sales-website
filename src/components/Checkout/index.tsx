"use client";

import React, { useState } from "react";
import PaymentMethod from "./PaymentMethod";
import { useBookingCart } from "@/context/BookingCartContext";
import ReferenceNumber from "../Booking/ReferenceNumber";

type Props = {
  customer?: any;
    bookingNumber:string | null;
};


const Checkout = ({
  customer,
  bookingNumber
}: Props) => {


  const [checkoutLoading, setCheckoutLoading] =
    useState(false);


  const {

  } = useBookingCart();



  const handleCheckout = async () => {

    try {

      setCheckoutLoading(true);

      // your checkout logic here
      // await createBooking();

      await new Promise(
        resolve => setTimeout(resolve,1000)
      );

    } finally {

      setCheckoutLoading(false);
    }
  };

  return (
    <>


      <section className="overflow-hidden bg-gray-2">
        <div className="
          max-w-[1170px]
          w-full
          mx-auto
          px-4
          sm:px-8
          xl:px-0
        ">
          <form
            onSubmit={(e)=>{

              e.preventDefault();

              handleCheckout();

            }}
          >
            <div className="w-full">
              <PaymentMethod />
              <button
                type="submit"
                disabled={checkoutLoading}
                className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                font-medium
                text-white
                bg-blue
                py-3
                px-6
                rounded-md
                ease-out
                duration-200
                hover:bg-blue-dark
                mt-7.5
                disabled:opacity-60
                disabled:cursor-not-allowed
                "
              >
              {
                checkoutLoading ?

                <>
                <span
                className="
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-white
                border-t-transparent
                "
                />
                Processing Booking...
                </>
                :
                "Confirm Booking"
              }
              </button>
            </div>
          </form>
        </div>
      </section>
      
         <ReferenceNumber
     value={bookingNumber}
   />
    </>
  );
};
export default Checkout;