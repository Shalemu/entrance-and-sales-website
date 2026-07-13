"use client";

import React, { useState } from "react";
import ReferenceNumber from "../Booking/ReferenceNumber";
import Pesapal from "./Pesapal";

type Props = {
  customer?: any;
  bookingId: number | null;
  bookingNumber: string | null;
  bookingAmount: number | null;
};


const Checkout = ({
  customer,
  bookingId,
  bookingNumber,
  bookingAmount
}: Props) => {


  const [checkoutLoading, setCheckoutLoading] =
    useState(false);



  return (

    <>
   <ReferenceNumber
        value={bookingNumber}
      />
      <section className="overflow-hidden bg-gray-2">
        <div
          className="
          max-w-[1170px]
          w-full
          mx-auto
          px-4
          sm:px-8
          xl:px-0
          "
        >
          <div className="w-full">

            <Pesapal
              customer={customer}
              bookingId={bookingId}
              bookingNumber={bookingNumber}
              bookingAmount={bookingAmount}
            />
          </div>
        </div>
      </section>
    </>
  );
};


export default Checkout;