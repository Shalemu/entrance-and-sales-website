"use client";

import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({
  label,
  ...props
}: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          rounded-md
          border
          border-gray-300
          bg-white
          px-3
          py-2.5
          text-sm
          placeholder:text-gray-400
          outline-none
          transition
          focus:border-blue-600
          focus:ring-2
          focus:ring-blue-100
        "
      />
    </div>
  );
}