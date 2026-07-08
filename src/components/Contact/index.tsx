"use client";

import React from "react";
import Breadcrumb from "../Common/Breadcrumb";

const Contact = () => {
  return (
    <>
      <Breadcrumb title={"Contact"} pages={["contact"]} />

      <section className="overflow-hidden py-2 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

          <div className="flex flex-col xl:flex-row gap-8">

            {/* ================= Left Side (Support Info Cards) ================= */}
            <div className="xl:max-w-[370px] w-full space-y-5">

              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-1 p-6">
                <h3 className="font-semibold text-dark mb-2">Quick Support</h3>
                <p className="text-sm text-gray-600">
                  Need help? Our support team is ready to assist you within 24 hours.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-1 p-6">
                <h3 className="font-semibold text-dark mb-2">Response Time</h3>
                <p className="text-sm text-gray-600">
                  We usually respond within a few hours during working days.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-1 p-6">
                <h3 className="font-semibold text-dark mb-2">Help Topics</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Account issues</li>
                  <li>• Service booking</li>
                  <li>• Payment support</li>
                  <li>• Technical help</li>
                </ul>
              </div>

            </div>

            {/* ================= Right Side (Form) ================= */}
            <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">

              <h2 className="text-xl font-semibold text-dark mb-6">
                Send us a message
              </h2>

              <form>

                <div className="flex flex-col lg:flex-row gap-5 mb-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full rounded-md border border-gray-3 bg-gray-1 py-3 px-5 outline-none focus:ring-2 focus:ring-blue/20"
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-gray-3 bg-gray-1 py-3 px-5 outline-none focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-5 mb-5">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-md border border-gray-3 bg-gray-1 py-3 px-5 outline-none focus:ring-2 focus:ring-blue/20"
                  />

                  <input
                    type="text"
                    placeholder="Phone (optional)"
                    className="w-full rounded-md border border-gray-3 bg-gray-1 py-3 px-5 outline-none focus:ring-2 focus:ring-blue/20"
                  />
                </div>

                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full rounded-md border border-gray-3 bg-gray-1 p-5 mb-6 outline-none focus:ring-2 focus:ring-blue/20"
                ></textarea>

                <button
                  type="submit"
                  className="bg-blue text-white font-medium px-7 py-3 rounded-md hover:bg-blue-dark transition"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;