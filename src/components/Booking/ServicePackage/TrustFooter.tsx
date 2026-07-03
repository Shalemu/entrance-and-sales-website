"use client";

import {
  ShieldCheck,
  CreditCard,
  Headset,
  BadgeDollarSign,
} from "lucide-react";

export default function TrustFooter() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Secure Booking",
      description: "Your booking information is protected with enterprise-grade security.",
    },
    {
      icon: BadgeDollarSign,
      title: "Best Price Guarantee",
      description: "Competitive pricing with no hidden charges or unexpected fees.",
    },
    {
      icon: Headset,
      title: "24/7 Customer Support",
      description: "Our travel experts are available anytime you need assistance.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Fast and secure payment processing through trusted providers.",
    },
  ];

  return (
    <div className="border-t bg-gray-50 px-8 py-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-900">
          Why Book With Us?
        </h3>

        <p className="mt-2 text-gray-500">
          Trusted by thousands of travelers across Tanzania and beyond.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white border p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <Icon
                  className="text-blue-600"
                  size={28}
                />
              </div>

              <h4 className="mt-5 font-semibold text-gray-900">
                {item.title}
              </h4>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t pt-6 text-center">
        <p className="text-sm text-gray-500">
          © 2026 Faramas Ticketing System • Safe • Reliable • Professional
        </p>
      </div>
    </div>
  );
}