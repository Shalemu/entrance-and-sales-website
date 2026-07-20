"use client";

import { useBookingCart } from "@/context/BookingCartContext";
import { useServices } from "./hooks/useServices";
import ServiceCard from "./ServiceCard";
import ServiceCardSkeleton from "./ServiceCardSkeleton";

export default function ServicesList() {
  const { bookingDate } = useBookingCart();

  const {
    services,
    loading,
  } = useServices(bookingDate);

  const handleAdd = (booking: any) => {
    console.log("add", booking);
  };

  const handleRemove = () => {
    console.log("remove");
  };

  return (
    <div className="grid gap-4">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <ServiceCardSkeleton key={index} />
          ))
        : services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              quantity={0}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          ))}
    </div>
  );
}