"use client";

import { useState } from "react";

import CustomerForm from "./CustomerForm";
import ServicePackage from "./ServicePackage/ServicePackage";
import Participants from "./Participants";
import BookingSummary from "./BookingSummary";
import SuccessCard from "../Common/SuccessCard";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCustomerSuccess = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setStep(2);
    }, 2000);
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          Create Booking
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">

            {showSuccess ? (
              <SuccessCard
                title="Customer Created Successfully"
                message="Redirecting to Service & Package..."
              />
            ) : (
              <>
                {step === 1 && (
                  <CustomerForm
                    onSuccess={handleCustomerSuccess}
                  />
                )}

                {step === 2 && (
                  <ServicePackage
                    onSuccess={() => setStep(3)}
                  />
                )}

                {step === 3 && (
                  <Participants />
                )}
              </>
            )}

          </div>

          {/* Right Side */}
          <div>
            <BookingSummary />
          </div>
        </div>
      </div>
    </section>
  );
}