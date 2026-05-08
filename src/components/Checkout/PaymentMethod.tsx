import React, { useState } from "react";
import Image from "next/image";

const PaymentMethod = () => {
  const [payment, setPayment] = useState("advance");

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">
          Payment Option
        </h3>

        <p className="text-sm text-dark-5 mt-1">
          Choose how you would like to complete your booking payment.
        </p>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-4">

          {/* PAY ADVANCE */}
          <label
            htmlFor="advance"
            className="flex cursor-pointer select-none items-start gap-4"
          >
            <div className="relative mt-1">
              <input
                type="radio"
                name="payment"
                id="advance"
                className="sr-only"
                checked={payment === "advance"}
                onChange={() => setPayment("advance")}
              />

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  payment === "advance"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div
              className={`w-full rounded-md border py-4 px-5 duration-200 ${
                payment === "advance"
                  ? "border-blue bg-blue/5"
                  : "border-gray-3"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/checkout/cash.svg"
                  alt="advance payment"
                  width={22}
                  height={22}
                />

                <div>
                  <h4 className="font-medium text-dark">
                    Pay Advance
                  </h4>

                  <p className="text-sm text-dark-5 mt-1">
                    Pay a small amount now to confirm your booking.
                  </p>
                </div>
              </div>
            </div>
          </label>

          {/* PAY FULL */}
          <label
            htmlFor="full"
            className="flex cursor-pointer select-none items-start gap-4"
          >
            <div className="relative mt-1">
              <input
                type="radio"
                name="payment"
                id="full"
                className="sr-only"
                checked={payment === "full"}
                onChange={() => setPayment("full")}
              />

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  payment === "full"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div
              className={`w-full rounded-md border py-4 px-5 duration-200 ${
                payment === "full"
                  ? "border-blue bg-blue/5"
                  : "border-gray-3"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/checkout/bank.svg"
                  alt="full payment"
                  width={24}
                  height={24}
                />

                <div>
                  <h4 className="font-medium text-dark">
                    Pay Full Amount
                  </h4>

                  <p className="text-sm text-dark-5 mt-1">
                    Complete the full payment now and confirm instantly.
                  </p>
                </div>
              </div>
            </div>
          </label>

          {/* PAY LATER */}
          <label
            htmlFor="later"
            className="flex cursor-pointer select-none items-start gap-4"
          >
            <div className="relative mt-1">
              <input
                type="radio"
                name="payment"
                id="later"
                className="sr-only"
                checked={payment === "later"}
                onChange={() => setPayment("later")}
              />

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  payment === "later"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div
              className={`w-full rounded-md border py-4 px-5 duration-200 ${
                payment === "later"
                  ? "border-blue bg-blue/5"
                  : "border-gray-3"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/checkout/paypal.svg"
                  alt="pay later"
                  width={24}
                  height={24}
                />

                <div>
                  <h4 className="font-medium text-dark">
                    Book Now & Pay Later
                  </h4>

                  <p className="text-sm text-dark-5 mt-1">
                    Reserve your booking now and complete payment within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;