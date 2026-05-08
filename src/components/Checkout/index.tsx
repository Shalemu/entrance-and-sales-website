"use client";

import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import PaymentMethod from "./PaymentMethod";
import Billing from "./Billing";

const Checkout = () => {
  return (
    <>
      <Breadcrumb title={"Booking Checkout"} pages={["checkout"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            {/* TWO EQUAL SIDES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7.5 xl:gap-11">
              
              {/* LEFT SIDE */}
              <div className="w-full">
                {/* booking details */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                  <h3 className="text-xl font-semibold text-dark mb-6">
                    Booking Information
                  </h3>

                  <Billing />
                </div>

                {/* additional notes */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Additional Information (optional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Write any special requests or additional details about your booking or event ticket."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full">
                {/* booking summary */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Booking Summary
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    
                    {/* title */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <h4 className="font-medium text-dark">
                        Event / Service
                      </h4>

                      <h4 className="font-medium text-dark text-right">
                        Amount
                      </h4>
                    </div>

                    {/* item */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <p className="text-dark">
                        VIP Event Ticket
                      </p>

                      <p className="text-dark text-right">
                        TZS 50,000
                      </p>
                    </div>

                    {/* item */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <p className="text-dark">
                        Hall Booking Reservation
                      </p>

                      <p className="text-dark text-right">
                        TZS 150,000
                      </p>
                    </div>

                    {/* service fee */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <p className="text-dark">
                        Service Fee
                      </p>

                      <p className="text-dark text-right">
                        TZS 5,000
                      </p>
                    </div>

                    {/* total */}
                    <div className="flex items-center justify-between pt-5">
                      <p className="font-medium text-lg text-dark">
                        Total
                      </p>

                      <p className="font-medium text-lg text-dark text-right">
                        TZS 205,000
                      </p>
                    </div>
                  </div>
                </div>

                {/* payment method */}
                <PaymentMethod />

                {/* button */}
                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;