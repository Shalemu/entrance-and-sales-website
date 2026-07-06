"use client";

import JourneyHeader from "./JourneyHeader";
import ServiceCard from "./ServiceCard";
import PackageCard from "./PackageCard";
import TrustFooter from "./TrustFooter";

import GroupTypeSelect, { GroupType } from "../GroupType/Grouptype";
import { useGroup } from "../GroupType/hooks/useGroup";
import { useServices } from "./hooks/useServices";
import { usePackages } from "./hooks/usePackages";

import type { BranchService, Package } from "./types";

export type BookingItem = {
  service: BranchService;
  quantity: number;
  participants: number;
};

type Props = {
  selectedGroup: GroupType | null;
  setSelectedGroup: React.Dispatch<
    React.SetStateAction<GroupType | null>
  >;

  selectedPackage: Package | null;
  setSelectedPackage: React.Dispatch<
    React.SetStateAction<Package | null>
  >;

  items: BookingItem[];

  addService: (service: BranchService) => void;
  removeService: (serviceId: number) => void;

  updateServiceParticipants: (
    serviceId: number,
    value: number
  ) => void;

  onSuccess: () => void;
};

export default function ServicePackage({
  selectedGroup,
  setSelectedGroup,
  selectedPackage,
  setSelectedPackage,
  items,
  addService,
  removeService,
  updateServiceParticipants,
}: Props) {
  const { groups } = useGroup();
  const { services } = useServices();
  const { packages } = usePackages();

  return (
    <div className="overflow-hidden rounded-md border bg-white shadow-lg">
      <JourneyHeader />

      {/* GROUP */}
      <div className="border-b bg-gray-50 px-8 py-6">
        <GroupTypeSelect
          groups={groups}
          selectedId={selectedGroup?.id ?? null}
          onChange={(id) => {
            const group =
              groups.find((g) => g.id === id) ?? null;
            setSelectedGroup(group);
          }}
        />
      </div>

      {/* MAIN */}
      <div className="space-y-10 p-8">
        {/* SERVICES */}
        <section>
          <h2 className="text-2xl font-bold">
            Choose Services
          </h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {services.map((service) => {
              const inCart = items.find(
                (i) => i.service.id === service.id
              );

              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  quantity={inCart?.quantity ?? 0}
                  participants={inCart?.participants ?? 1}
                  onAdd={() => addService(service)}
                  onRemove={() => removeService(service.id)}
                  onParticipantsChange={(value) =>
                    updateServiceParticipants(service.id, value)
                  }
                />
              );
            })}
          </div>
        </section>

        {/* PACKAGES */}
        <section>
          <h2 className="text-2xl font-bold">
            Select Package
          </h2>

          <div className="mt-6 space-y-5">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                selected={selectedPackage?.id === pkg.id}
                onSelect={() => setSelectedPackage(pkg)}
              />
            ))}
          </div>
        </section>
      </div>

      <TrustFooter />
    </div>
  );
}