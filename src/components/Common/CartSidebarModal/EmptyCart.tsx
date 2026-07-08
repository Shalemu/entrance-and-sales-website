"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

export default function EmptyCart() {
  const { closeCartModal } = useCartModalContext();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">

      {/* Icon */}
      <div className="
        mb-6 
        flex h-24 w-24 
        items-center justify-center
        rounded-full
        bg-gray-100
      ">
        <ShoppingBag
          size={45}
          className="text-gray-400"
        />
      </div>


      {/* Title */}
      <h3 className="
        mb-2
        text-xl
        font-semibold
        text-gray-900
      ">
        No Booking Selected
      </h3>


      {/* Description */}
      <p className="
        mb-6
        max-w-sm
        text-sm
        text-gray-500
      ">
        Your booking list is currently empty.
        Select a service or package to continue.
      </p>


      {/* Button */}
      <Link
        href="/events"
        onClick={closeCartModal}
        className="
          flex
          w-full
          max-w-xs
          justify-center
          rounded-lg
          bg-blue-600
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
      >
        Explore Services
      </Link>

    </div>
  );
}