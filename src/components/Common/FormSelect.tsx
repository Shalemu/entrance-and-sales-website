"use client";

interface Props {
  label: string;
}

export default function FormSelect({ label }: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        className="
          w-full
          rounded-md
          border
          border-gray-300
          bg-white
          px-3
          py-2.5
          text-sm
          outline-none
          transition
          focus:border-blue-600
          focus:ring-2
          focus:ring-blue-100
        "
      >
        <option>Select nationality</option>
        <option>Tanzania</option>
        <option>Kenya</option>
        <option>Uganda</option>
      </select>
    </div>
  );
}