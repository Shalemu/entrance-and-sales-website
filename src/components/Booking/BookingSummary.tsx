"use client";

export default function BookingSummary() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">

      <h2 className="text-xl font-semibold">
        Booking Summary
      </h2>

      <div className="mt-6 space-y-3 text-sm">

        <div className="flex justify-between">
          <span>Customer Type</span>
          <span>-</span>
        </div>

        <div className="flex justify-between">
          <span>Tickets</span>
          <span>-</span>
        </div>

        <div className="flex justify-between">
          <span>Total</span>
          <span>TZS 0</span>
        </div>

      </div>

    </div>
  );
}