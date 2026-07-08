"use client";

import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import PaymentMethod from "./PaymentMethod";
import Billing from "./Billing";
import { useBookingCart } from "@/context/BookingCartContext";

type Props = {
  customer?: any;
};


const Checkout = ({
  customer
}: Props) => {
  const {

}=useBookingCart();
  return (
    <>
      {/* <Breadcrumb title={"Booking Checkout"} pages={["checkout"]} /> */}

      <section className="overflow-hidden  bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            {/* TWO EQUAL SIDES */}
           
              {/*  */}
              <div className="w-full">
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
           
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;