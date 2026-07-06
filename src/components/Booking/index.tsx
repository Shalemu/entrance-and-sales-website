"use client";

import { useState } from "react";

import CustomerForm from "./CustomerForm";
import ServicePackage from "./ServicePackage/ServicePackage";
import Participants from "./Participants";
import BookingSummary from "./BookingSummary";

import type { BranchService, Package } from "./ServicePackage/types";
import type { GroupType } from "./GroupType/Grouptype";

export type BookingItem = {
  service: BranchService;
  quantity: number;

  // per-service participants
  participants: number;
};

export default function Booking() {
  const [step, setStep] = useState(1);

  const [selectedGroup, setSelectedGroup] =
    useState<GroupType | null>(null);

  const [selectedPackage, setSelectedPackage] =
    useState<Package | null>(null);

  const [participants, setParticipants] = useState(1);

  const [items, setItems] = useState<BookingItem[]>([]);

  // =========================
  // ADD SERVICE
  // =========================
  const addService = (service: BranchService) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.service.id === service.id
      );

      const min = service.min_participants ?? 1;
      const max = service.max_participants ?? 999;

      if (existing) {
        return prev.map((item) => {
          if (item.service.id === service.id) {
            const newQty = item.quantity + 1;

            if (newQty > max) {
              alert(`Max ${max} participants allowed`);
              return item;
            }

            return {
              ...item,
              quantity: newQty,
            };
          }
          return item;
        });
      }

      return [
        ...prev,
        {
          service,
          quantity: 1,
          participants: min,
        },
      ];
    });
  };

  // =========================
  // INCREASE QUANTITY
  // =========================
  const increaseQuantity = (serviceId: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.service.id !== serviceId) return item;

        const max =
          item.service.max_participants ?? 999;

        if (item.quantity + 1 > max) {
          alert(`Max ${max} reached`);
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================
  const decreaseQuantity = (serviceId: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.service.id !== serviceId) return item;

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================
  // UPDATE PARTICIPANTS PER SERVICE
  // =========================
  const updateServiceParticipants = (
    serviceId: number,
    value: number
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.service.id !== serviceId) return item;

        const min =
          item.service.min_participants ?? 1;

        const max =
          item.service.max_participants ?? 999;

        if (value < min || value > max) {
          alert(`Allowed range: ${min} - ${max}`);
          return item;
        }

        return {
          ...item,
          participants: value,
        };
      })
    );
  };

  // =========================
  // REMOVE SERVICE
  // =========================
  const removeService = (serviceId: number) => {
    setItems((prev) =>
      prev.filter(
        (item) => item.service.id !== serviceId
      )
    );
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Create Booking
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            {step === 1 && (
              <CustomerForm onSuccess={() => setStep(2)} />
            )}

            {step === 2 && (
              <ServicePackage
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                selectedPackage={selectedPackage}
                setSelectedPackage={setSelectedPackage}
                items={items}
                addService={addService}
                removeService={removeService}
                updateServiceParticipants={
                  updateServiceParticipants
                }
                onSuccess={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <Participants
                value={participants}
                onChange={setParticipants}
              />
            )}
          </div>

          {/* RIGHT */}
          <div>
            <BookingSummary
              group={selectedGroup}
              pkg={selectedPackage}
              participants={participants}
              items={items}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
          </div>
        </div>
      </div>
    </section>
  );
}