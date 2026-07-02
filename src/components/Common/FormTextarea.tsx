"use client";

import { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function FormTextarea({
  label,
  ...props
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <textarea
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 placeholder:text-slate-400 hover:border-blue-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}