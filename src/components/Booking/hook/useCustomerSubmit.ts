"use client";

import { apiFetch } from "@/lib/api";
import { useState } from "react";

export function useCustomerSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitCustomer = async (payload: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/customers", {
        method: "POST",
        body: payload,
        auth: false, // public endpoint as you said
      });

      return res;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitCustomer, loading, error };
}