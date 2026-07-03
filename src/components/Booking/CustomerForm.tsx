"use client";

import { useState } from "react";
import { User, Users, Building2, UserRound } from "lucide-react";

import IndividualForm from "./IndividualForm";
import FamilyForm from "./FamilyForm";
import CorporateForm from "./CorporateForm";

  type Props = {
  onSuccess: () => void;
};

export default function CustomerForm({ onSuccess }: Props) {
  const [type, setType] = useState("individual");

  const customerTypes = [
    { id: "individual", label: "Individual", icon: <User size={16} /> },
    { id: "family", label: "Family", icon: <Users size={16} /> },
    { id: "corporate", label: "Corporate", icon: <Building2 size={16} /> },
  ];
  
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="rounded-2xl overflow-hidden border bg-white shadow-md">

        <div className="bg-blue-600 px-6 py-6 text-white">
          <h2 className="text-lg font-semibold">Customer Type</h2>
          <p className="text-sm text-blue-100">
            Select a customer type before filling details
          </p>

          {/* tabs */}
          <div className="mt-6 grid grid-cols-4 bg-white/10 p-1 rounded-xl">
            {customerTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setType(item.id)}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                  type === item.id
                    ? "bg-white text-blue-600"
                    : "text-white/80 hover:bg-white/20"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="p-6">
          {type === "individual" && <IndividualForm type="individual" onSuccess={onSuccess}/>}
          {type === "family" && <FamilyForm type="family" onSuccess={onSuccess}/>}
          {type === "corporate" && <CorporateForm type="corporate" onSuccess={onSuccess}/>}
        </div>

      </div>
    </div>
  );
}
