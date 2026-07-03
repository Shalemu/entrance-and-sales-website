"use client";

import { ArrowRight, CheckCircle2, Plus } from "lucide-react";
import { Service } from "./types";

type Props = {
  service: Service;
  selected: boolean;
  onSelect: () => void;
};

export default function ServiceCard({
  service,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        selected
          ? "border-blue-600 ring-2 ring-blue-100"
          : "border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {service.name}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {service.description ?? "No description available"}
          </p>

       
        </div>

        {selected && (
          <CheckCircle2 className="text-green-500" size={22} />
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-8 flex items-center justify-between border-t pt-5">
        <div>
          <p className="text-xs text-gray-500">
            Service ID: {service.id}
          </p>
        </div>

        <button
          type="button"
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
            selected
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 group-hover:bg-blue-50"
          }`}
        >
        {selected ? "Selected" : "Add service"}
       <Plus size={16} />
        </button>
      </div>
    </div>
  );
}