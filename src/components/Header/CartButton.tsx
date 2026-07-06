"use client";

import { ShoppingBag } from "lucide-react";

type Props = {
  itemCount: number;
  totalPrice: number;
  onClick: () => void;
};

export default function CartButton({
  itemCount,
  totalPrice,
  onClick,
}: Props) {
  const formattedPrice = new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  return (
    <button
      onClick={onClick}
      className="hidden xl:flex items-center gap-3 transition-colors hover:text-blue-600"
    >
      {/* Icon */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <ShoppingBag size={20} />

        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="text-left leading-tight">
        <p className="text-[11px] uppercase tracking-widest text-gray-500">
          Cart
        </p>

        <p className="text-sm font-semibold text-gray-900">
          {formattedPrice}
        </p>
      </div>
    </button>
  );
}