"use client";

import { useEffect, useMemo, useState } from "react";
import { getServices } from "../api/service.api";
import { selectPriceForDate } from "../utils/pricing";

export function useServices(bookingDate?: string) {
  const [rawServices, setRawServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getServices();

      setRawServices(data);
    } catch (err: any) {
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const services = useMemo(() => {
    // If no booking date is provided,
    // return all services unchanged.
    if (!bookingDate) {
      return rawServices;
    }

    // Otherwise return only the price
    // that matches the selected booking date.
    return rawServices
      .map((service) => {
        const matchedPrice = selectPriceForDate(
          service.prices || [],
          bookingDate
        );

        if (!matchedPrice) {
          return null;
        }

        return {
          ...service,
          prices: [matchedPrice],
        };
      })
      .filter(
        (service): service is NonNullable<typeof service> =>
          service !== null
      );
  }, [rawServices, bookingDate]);

  return {
    services,
    loading,
    error,
    refresh: loadServices,
  };
}