"use client";

import React from "react";
import Image from "next/image";

const Newsletter = () => {
  return (
    <section className="overflow-hidden py-10">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

        <div className="relative overflow-hidden rounded-xl">

          {/* Background Image */}
          <Image
            src="/images/shapes/newsletter-bg.jpg"
            alt="Newsletter background"
            fill
            priority
            className="object-cover"
          />

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 px-6 sm:px-10 xl:px-12 py-12">

            {/* Left content */}
            <div className="max-w-[520px]">
              <h2 className="text-white font-bold text-xl sm:text-2xl xl:text-3xl mb-3 leading-snug">
                Don&apos;t Miss Out Latest Trends & Offers
              </h2>

              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Subscribe to receive updates about new services, latest offers,
                and exclusive discount codes.
              </p>
            </div>

            {/* Right form */}
            <div className="w-full max-w-[480px]">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-md px-5 py-3 bg-white/90 text-dark outline-none border border-white/30 focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  className="px-7 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-xs text-white/70 mt-3">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;