"use client";

import { useState } from "react";
import { User, Users, Building2, UserRound } from "lucide-react";

import IndividualForm from "./IndividualForm";
import FamilyForm from "./FamilyForm";
import CorporateForm from "./CorporateForm";

export default function CustomerForm() {
  const [type, setType] = useState("walkin");

  const customerTypes = [
    { id: "walkin", label: "Walk In", icon: <UserRound size={16} /> },
    { id: "individual", label: "Individual", icon: <User size={16} /> },
    { id: "family", label: "Family", icon: <Users size={16} /> },
    { id: "corporate", label: "Corporate", icon: <Building2 size={16} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white shadow-md overflow-hidden">

        {/* HEADER */}
        <div className="border-b border-gray-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Customer Type
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a customer type before filling details
          </p>

          {/* SEGMENTED TABS */}
          <div className="mt-6">
            <div className="grid grid-cols-4 bg-gray-100 p-1 rounded-xl">
              {customerTypes.map((item) => {
                const active = type === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setType(item.id)}
                    className={`
                      relative flex items-center justify-center gap-2
                      px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-300
                      ${
                        active
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/40"
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>

                    {/* subtle active glow */}
                    {active && (
                      <span className="absolute inset-0 rounded-lg ring-1 ring-blue-100" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 bg-white">
          <div className="transition-all duration-300">
            {(type === "walkin" || type === "individual") && (
              <IndividualForm />
            )}

            {type === "family" && <FamilyForm />}

            {type === "corporate" && <CorporateForm />}
          </div>
        </div>
      </div>
    </div>
  );
}