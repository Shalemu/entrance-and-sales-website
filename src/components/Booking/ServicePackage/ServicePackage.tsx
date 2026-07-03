"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import JourneyHeader from "./JourneyHeader";
import ServiceCard from "./ServiceCard";
import PackageCard from "./PackageCard";
import TrustFooter from "./TrustFooter";

import { Service, Package } from "./types";
import { useServices } from "./hooks/useServices";
import { usePackages } from "./hooks/usePackages";

type Props = {
  onSuccess: () => void;
};

export default function ServicePackage({
  onSuccess,
}: Props) {
  // Load Services
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
  } = useServices();

  // Selected Service
 const [selectedService, setSelectedService] =
  useState<Service | null>(null);

  // Selected Package
  const [selectedPackage, setSelectedPackage] =
    useState<Package | null>(null);

  // Load Packages of Selected Service
const {
  packages,
  loading: packagesLoading,
  error: packagesError,
} = usePackages(selectedService?.id);

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
      <JourneyHeader />

      <div className="space-y-10 p-8">
        {/* SERVICES 1 */}

        <section>
          <h2 className="text-2xl font-bold text-gray-900">
           Choose a Service
          </h2>

          <p className="mt-2 text-gray-500">
            Select a service to see available packages.
          </p>

          {servicesLoading && (
            <div className="mt-8 rounded-xl border bg-gray-50 p-8 text-center">
              Loading services...
            </div>
          )}

          {servicesError && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
              {servicesError}
            </div>
          )}

          {!servicesLoading && !servicesError && (
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selectedService?.id === service.id}
                  onSelect={() => {
                    setSelectedService(service);
                    setSelectedPackage(null);
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* PACKAGE 2 */}

        <section>
          <h2 className="text-2xl font-bold text-gray-900">
            Select a Package
          </h2>

          {!selectedService ? (
            <div className="mt-6 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 p-8 text-center text-blue-700">
              Please select a service above.
            </div>
          ) : packagesLoading ? (
            <div className="mt-6 rounded-xl border bg-gray-50 p-8 text-center">
              Loading packages...
            </div>
          ) : packagesError ? (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
              {packagesError}
            </div>
          ) : (
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
          )}
        </section>

        {/* Continue */}

        <div className="flex justify-end">
          <button
            type="button"
            disabled={!selectedPackage}
            onClick={onSuccess}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <TrustFooter />
    </div>
  );
}