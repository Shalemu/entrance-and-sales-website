"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import React, { useState } from "react";

const TrackBooking = () => {
  const [referenceNumber, setReferenceNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // later you will connect API here
    console.log("Tracking booking:", referenceNumber);
  };

  return (
    <>
      <Breadcrumb title={"Track Booking"} pages={["Track Booking"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

          <div className="max-w-[520px] w-full mx-auto rounded-xl bg-white shadow-1 p-6 sm:p-10">

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="font-semibold text-xl sm:text-2xl text-dark mb-2">
                Enter Your Booking Reference
              </h2>
              <p className="text-gray-500 text-sm">
                Track your booking status instantly
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-dark">
                  Booking Reference Number
                </label>

                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="e.g. BK-2026-00123"
                  className="w-full rounded-lg border border-gray-3 bg-gray-1 py-3 px-5 outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg hover:bg-blue transition"
              >
                Track Booking
              </button>

              {/* Helper text */}
              <p className="text-center text-sm text-gray-500 mt-4">
                Enter your reference number to check booking details
              </p>

            </form>

          </div>
        </div>
      </section>
    </>
  );
};

export default TrackBooking;