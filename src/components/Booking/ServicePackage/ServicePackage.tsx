"use client";

import JourneyHeader from "./JourneyHeader";
import ServiceCard from "./ServiceCard";
import PackageCard from "./PackageCard";
import TrustFooter from "./TrustFooter";
import { useGroup } from "../GroupType/hooks/useGroup";
import { useServices } from "./hooks/useServices";
import { usePackages } from "./hooks/usePackages";

import type {
  BranchService,
  Package,
} from "./types/types";

import type {
  BookingData,
} from "./types/booking";
import { BookingItem } from "..";
import ServiceCardSkeleton from "./ServiceCardSkeleton";
import PackageCardSkeleton from "./PackageCardSkeleton";

type Props = {

  selectedPackage: Package | null;

  setSelectedPackage: React.Dispatch<
    React.SetStateAction<Package | null>
  >;


  items: BookingItem[];


  addService: (
    service: BranchService,
    booking: BookingData
  ) => void;


  removeService: (
    serviceId: number
  ) => void;


  updateServiceParticipants: (
    serviceId: number,
    value: number
  ) => void;



  // PACKAGE HANDLING

  addPackage: (
    pkg: Package,
    booking: BookingData
  ) => void;


  removePackage: (
    packageId: number
  ) => void;

};

export default function ServicePackage({

  selectedPackage,
  setSelectedPackage,

  items,

  addService,
  removeService,
  

  updateServiceParticipants,

  addPackage,
  removePackage,

}:Props){

  const {
    groups
  } = useGroup();
  const {
    services,
    loading: servicesLoading
  } = useServices();
  const {
    packages,
    loading: packagesLoading 
  } = usePackages();

  return (

    <div
      className="
      overflow-hidden
      rounded-md
      border
      bg-white
      shadow-lg
      "
    >
      <JourneyHeader />

      {/* GROUP */}

      <div
        className="
        border-b
        bg-gray-50
        px-8
        py-6
        "
      >
      </div>

      {/* CONTENT */}
      <div
        className="
        space-y-10
        p-8
        "
      >
        {/* SERVICES */}
<section>
  <h2
    className="
    text-2xl
    font-bold
    text-gray-900
    "
  >
    Choose Services
  </h2>
  <div
    className="
    mt-6
    grid
    gap-6
    lg:grid-cols-2
    "
  >
    {
      servicesLoading ?
      // LOADING STATE
      Array.from({
        length: 4
      }).map((_, index)=>(
        <ServiceCardSkeleton
          key={index}
        />
      ))
      :
      // DATA STATE
      services.map(
        (service)=>{
          const inCart =
            items.find(
              (item)=>
              item.service?.id === service.id
            );
          return (
            <ServiceCard
  key={service.id}
  service={service}
  quantity={inCart?.quantity ?? 0}
  onAdd={async (booking)=>{

    await addService(
      service,
      booking
    );

  }}
  onRemove={()=>{

    removeService(
      service.id
    );

  }}
/>
          );
        }
      )
    }
  </div>
</section>

       {/* PACKAGES */}
<section>

  <h2
    className="
    text-2xl
    font-bold
    text-gray-900
    "
  >
    Select Package
  </h2>


  <div
    className="
    mt-6
    space-y-5
    "
  >

    {
      packagesLoading ?

      // LOADING STATE
      Array.from({
        length: 3
      }).map((_, index)=>(

        <PackageCardSkeleton
          key={index}
        />

      ))

      :

      // DATA STATE
      packages.map(
        (pkg)=>(
          <PackageCard
            key={
              pkg.id
            }
            package={
              pkg
            }
            selected={
              selectedPackage?.id === pkg.id
            }
            quantity={
              items.find(
                (item)=>
                item.package?.id === pkg.id
              )?.quantity ?? 0
            }
            onAdd={
              (booking)=>{
                setSelectedPackage(pkg);

                addPackage(
                  pkg,
                  booking
                );

              }
            }
            onRemove={
              ()=>{

                removePackage(
                  pkg.id
                );
              }
            }
          />
        )
      )
    }
  </div>
</section>
      </div>
      {/* <TrustFooter /> */}
    </div>
  );

}