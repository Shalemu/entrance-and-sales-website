"use client";

import CustomerForm from "./CustomerForm";
import Participants from "./Participants";
import BookingSummary from "./BookingSummary";

const Booking = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">
         Create Booking
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <CustomerForm />
            <Participants />
          </div>

          {/* Right */}
          <div>
            <BookingSummary />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Booking;