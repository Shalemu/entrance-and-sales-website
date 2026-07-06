"use client";

import { useState } from "react";
import { User, Users, Building2 } from "lucide-react";

import IndividualForm from "./IndividualForm";
import FamilyForm from "./FamilyForm";
import CorporateForm from "./CorporateForm";


type Props = {
  onSuccess: () => void;
};

export default function CustomerForm({ onSuccess }: Props) {
  const [type, setType] = useState("individual");
  const [isLoading, setIsLoading] = useState(false);

  const customerTypes = [
    {
      id: "individual",
      label: "Individual",
      icon: <User size={16} />,
    },
    {
      id: "family",
      label: "Family",
      icon: <Users size={16} />,
    },
    {
      id: "corporate",
      label: "Corporate",
      icon: <Building2 size={16} />,
    },
  ];

 const handleSuccess = () => {
  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);
    onSuccess();
  }, 2000);
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-md">
        <div className="bg-blue-600 px-6 py-6 text-white">
          <h2 className="text-lg font-semibold">Contact details</h2>

          <p className="text-sm text-blue-100">
            Fill in the contact information to continue with your booking.
          </p>

          {/* Tabs */}
          <div className="mt-6 grid grid-cols-3 rounded-xl bg-white/10 p-1">
            {customerTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setType(item.id)}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  type === item.id
                    ? "bg-white text-blue-600 shadow"
                    : "text-white/80 hover:bg-white/20"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {type === "individual" && (
            <IndividualForm
              type="individual"
              onSuccess={handleSuccess}
            />
          )}

          {type === "family" && (
            <FamilyForm
              type="family"
              onSuccess={handleSuccess}
            />
          )}

          {type === "corporate" && (
            <CorporateForm
              type="corporate"
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}