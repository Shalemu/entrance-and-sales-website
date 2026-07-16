"use client";

import React from "react";
import ReferenceNumber from "../Booking/ReferenceNumber";
import Pesapal from "./Pesapal";

type Props = {
  bookingNumber: string | null;
  pesapalUrl: string | null;
};

const Checkout = ({
  bookingNumber,
  pesapalUrl,
}: Props) => {
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
              redirectUrl={pesapalUrl}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;