"use client";

import { useRef, useState } from "react";
import { User, Users, Building2, CalendarDays } from "lucide-react";

import IndividualForm from "./IndividualForm";
import CorporateForm from "./CorporateForm";
import { useGroup } from "./GroupType/hooks/useGroup";
import SocialGroupForm from "./SocialGroupForm";
import { useBookingCart } from "@/context/BookingCartContext";

type Props = {
  onSuccess: () => void;
  onCustomerSaved: (customer: any) => void;
  customer?: any;
};

export default function CustomerForm({
  onSuccess,
  onCustomerSaved,
  customer,
}: Props) {
  // seeded from whatever was already saved, so navigating back to this
  // step (e.g. to fix a typo) reopens on the same tab with the same
  // values instead of resetting to a blank individual form
  const [type, setType] = useState(
    () => customer?.group?.code?.toLowerCase() ?? "individual"
  );
  const [selectedGroup, setSelectedGroup] = useState<any>(
    () => customer?.group ?? null
  );

  const { groups } = useGroup();
  const { bookingDate, setBookingDate } = useBookingCart();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const formattedBookingDate = bookingDate
    ? new Date(bookingDate).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const groupIcons: Record<string, React.ReactNode> = {
    individual: <User size={16} />,
    social: <Users size={16} />,
    corporate: <Building2 size={16} />,
  };

  const customerTypes = groups.map((group) => ({
    id: group.code.toLowerCase(),
    label: group.name,
    icon: groupIcons[group.code.toLowerCase()],
  }));

  const handleSuccess = () => {
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-md">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 px-6 py-5 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm font-medium">
              <CalendarDays size={16} className="text-blue-100" />
              Tickets for {formattedBookingDate}
            </span>

            <button
              type="button"
              onClick={() =>
                dateInputRef.current?.showPicker
                  ? dateInputRef.current.showPicker()
                  : dateInputRef.current?.click()
              }
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 hover:shadow-md"
            >
              <CalendarDays size={15} />
              Change date
            </button>

            <input
              ref={dateInputRef}
              type="date"
              value={bookingDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setBookingDate(e.target.value)}
              className="hidden"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 grid grid-cols-3 rounded-xl border border-gray-200 bg-gray-50 p-1">
            {customerTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setType(item.id);

                  const group = groups.find(
                    (g) => g.code.toLowerCase() === item.id
                  );

                  setSelectedGroup(group);
                }}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  type === item.id
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {type === "individual" && (
            <IndividualForm
              type="individual"
              onSuccess={handleSuccess}
              initialValues={customer}
              onCustomerSaved={(customer) =>
                onCustomerSaved({
                  ...customer,
                  group: selectedGroup,
                })
              }
            />
          )}

          {type === "social" && (
            <SocialGroupForm
              type="social"
              onSuccess={handleSuccess}
              initialValues={customer}
              onCustomerSaved={(customer) =>
                onCustomerSaved({
                  ...customer,
                  group: selectedGroup,
                })
              }
            />
          )}

          {type === "corporate" && (
            <CorporateForm
              type="corporate"
              onSuccess={handleSuccess}
              initialValues={customer}
              onCustomerSaved={(customer) =>
                onCustomerSaved({
                  ...customer,
                  group: selectedGroup,
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}