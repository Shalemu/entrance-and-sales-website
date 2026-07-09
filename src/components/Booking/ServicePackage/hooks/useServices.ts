"use client";

import { useEffect, useState } from "react";
import { getServices } from "../api/service.api";

export function useServices() {

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const loadServices = async () => {

    try {

      setLoading(true);

      const data = await getServices();

      setServices(data);

    } catch (err:any) {

      setError(
        err.message || "Failed to load services"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    loadServices();
  }, []);


  return {
    services,
    loading,
    error,
    refresh: loadServices,
  };
}