"use client";

import React, { useEffect, useState } from "react";
import Checkout from "@/components/Checkout";

const CheckoutPage = () => {

  const [bookingId, setBookingId] = useState<number | null>(null);
  const [bookingNumber, setBookingNumber] = useState<string | null>(null);
  const [bookingAmount, setBookingAmount] = useState<number | null>(null);

  useEffect(() => {
    const booking = JSON.parse(
      localStorage.getItem("booking") || "{}"
    );

    setBookingId(booking.id || null);
    setBookingNumber(booking.number || null);
    setBookingAmount(booking.amount || null);
  }, []);


  return (
    <main>
      <Checkout
        bookingId={bookingId}
        bookingNumber={bookingNumber}
        bookingAmount={bookingAmount}
      />
    </main>
  );
};

export default CheckoutPage;