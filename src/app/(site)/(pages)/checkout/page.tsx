"use client";

import React, { useEffect, useState } from "react";
import Checkout from "@/components/Checkout";

const CheckoutPage = () => {

  const [bookingNumber, setBookingNumber] =
    useState<string | null>(null);

  const [pesapalUrl, setPesapalUrl] =
    useState<string | null>(null);

  useEffect(() => {

    const booking = JSON.parse(
      localStorage.getItem("booking") || "{}"
    );

    setBookingNumber(
      booking.booking_number ?? null
    );

    setPesapalUrl(
      booking.redirect_url ?? null
    );

  }, []);

  return (
    <main>
      <Checkout
        bookingNumber={bookingNumber}
        pesapalUrl={pesapalUrl}
      />
    </main>
  );
};

export default CheckoutPage;