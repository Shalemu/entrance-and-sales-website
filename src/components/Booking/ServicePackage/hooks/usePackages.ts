"use client";

import { useEffect, useMemo, useState } from "react";
import { getPackages } from "../api/package.api";
import { selectPriceForDate } from "../utils/pricing";

export function usePackages(bookingDate: string) {
  const [rawPackages, setRawPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPackages();

      setRawPackages(data);
    } catch (err: any) {
      setError(err.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  // only keep packages that have a price matching the selected booking
  // date's weekday/weekend/holiday rule — never mix in the other tiers
  const packages = useMemo(() => {

    if (!bookingDate) return [];

    return rawPackages
      .map((pkg) => {

        const matchedPrice = selectPriceForDate(
          pkg.prices || [],
          bookingDate
        );

        if (!matchedPrice) return null;

        return {
          ...pkg,
          prices: [matchedPrice],
        };

      })
      .filter(Boolean);

  }, [rawPackages, bookingDate]);

  return {
    packages,
    loading,
    error,
    refresh: loadPackages,
  };
}
