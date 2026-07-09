"use client";

import { useState } from "react";
import { trackBooking } from "../api/booking.api";

export function useTrackBooking() {

  const [booking, setBooking] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);


  const searchBooking = async (
    reference:string
  ) => {

    try {

      setLoading(true);
      setError(null);


      const data = await trackBooking(reference);


      console.log("TRACK RESPONSE:", data);


      setBooking(data);


      return data;


    } catch(err:any) {

      setError(
        err.message || "Booking not found"
      );

      throw err;

    } finally {

      setLoading(false);

    }

  };


  return {
    booking,
    loading,
    error,
    searchBooking
  };

}