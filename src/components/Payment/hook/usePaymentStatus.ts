"use client";

import { useEffect, useState } from "react";
import { getPaymentStatus } from "../api/payment";


export function usePaymentStatus(
  trackingId: string | null
) {

  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );


  useEffect(() => {

    if (!trackingId) {
      setLoading(false);
      return;
    }


    async function fetchStatus() {

      try {

        const response =
          await getPaymentStatus(
            trackingId
          );


        setData(
          response.data
        );


      } catch(error:any) {

        setError(
          error.message
        );

      }
      finally {

        setLoading(false);

      }

    }


    fetchStatus();


  }, [trackingId]);



  return {
    data,
    loading,
    error
  };

}