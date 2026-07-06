"use client";

import { useEffect, useState } from "react";
import { getPackages } from "../api/package.api";

export function usePackages() {
  const [packages, setPackages] = useState<any[]>([]);
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

      setPackages(data);
    } catch (err: any) {
      setError(err.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  return {
    packages,
    loading,
    error,
    refresh: loadPackages,
  };
}