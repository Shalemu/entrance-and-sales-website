"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  customer: any;
  bookingId: number | null;
  bookingNumber: string | null;
  bookingAmount: number | null;
};

const Pesapal = ({
  customer,
  bookingId,
  bookingNumber,
  bookingAmount,
}: Props) => {

  const [loading, setLoading] = useState(true);

  const [redirectUrl, setRedirectUrl] =
    useState<string | null>(null);

  useEffect(() => {

    const initializePayment = async () => {

      try {

        if (!bookingId || !bookingAmount) {
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/payments/pesapal/create",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },

            body: JSON.stringify({

              booking_id: bookingId,

              booking_number: bookingNumber,

              amount: bookingAmount,

              email: customer?.email,

              phone: customer?.phone,

              first_name: customer?.first_name,

              last_name: customer?.last_name,

            }),
          }
        );

        const data = await response.json();

        console.log("Pesapal Response:", data);

        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to initialize payment"
          );

        }

        if (!data.redirect_url) {

          throw new Error(
            "Redirect URL not returned."
          );

        }

        setRedirectUrl(data.redirect_url);

      }
      catch (error: any) {

        console.error(error);

        toast.error(
          "Payment Error",
          {
            description: error.message,
          }
        );

      }
      finally {

        setLoading(false);

      }

    };

    initializePayment();

  }, [
    bookingId,
    bookingNumber,
    bookingAmount,
    customer,
  ]);

  if (redirectUrl) {

    return (

      <div className="bg-white rounded-lg shadow mt-8">

        <div className="border-b p-5">

          <h2 className="text-xl font-semibold">
            Complete Your Payment
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Secure checkout powered by Pesapal.
          </p>

        </div>

        <iframe
          src={redirectUrl}
          title="Pesapal Checkout"
          className="w-full h-[900px] border-0"
          allow="payment"
        />

      </div>

    );

  }


  return (

    <div className="bg-white rounded-lg shadow mt-8 p-10 text-center">

      <h2 className="text-xl font-semibold text-red-600">
        Unable to load payment page
      </h2>

    </div>

  );

};

export default Pesapal;