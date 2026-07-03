"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Package } from "../types";

export function usePackages(serviceId?: string) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!serviceId) return;

    async function fetchPackages() {
      setLoading(true);

      try {
        const data = await apiFetch(
          `/packages?service_id=${serviceId}`
        );

        setPackages(data.data ?? data);
      } catch (err) {
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, [serviceId]);

  return { packages, loading, error };
}