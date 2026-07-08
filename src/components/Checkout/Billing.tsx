"use client";

import React from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

type Props = {
  customer?: any;
};

export default function Billing({
  customer,
}: Props) {
  return (
    <div>
      {/* Title */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-dark">
          Billing Information
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Customer details for this booking.
        </p>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Top Banner */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <User size={18} />
            </div>

            <div>
              <h3 className="font-semibold text-dark">
                {customer?.first_name} {customer?.last_name}
              </h3>

              <p className="text-xs text-gray-500">
                Booking Contact
              </p>
            </div>
          </div>

          <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            Verified
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Phone */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                <Phone size={13} />
                Phone
              </div>

              <p className="mt-1 font-medium text-dark">
                {customer?.phone || "-"}
              </p>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                <Mail size={13} />
                Email
              </div>

              <p className="mt-1 font-medium text-dark break-all">
                {customer?.email || "-"}
              </p>
            </div>

            {/* Country */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 md:col-span-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                <MapPin size={13} />
                Country / Region
              </div>

              <p className="mt-1 font-medium text-dark">
                Tanzania
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <ShieldCheck
              size={18}
              className="text-blue-600 mt-0.5"
            />

            <p className="text-sm text-gray-700">
              By proceeding with this booking, you agree to our
              Terms & Conditions and confirm that the information
              provided is accurate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}