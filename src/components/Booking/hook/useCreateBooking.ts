"use client";

import { useState } from "react";
import {
  postBooking,
  BookingResponse,
} from "../api/booking.api";

export function useCreateBooking() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (
    payload: any
  ): Promise<BookingResponse> => {

    try {

      setLoading(true);

      return await postBooking(payload);

    } catch (error: any) {

      setError(error.message ?? "Booking failed");
      throw error;

    } finally {

      setLoading(false);

    }

  };

  return {
    createBooking,
    loading,
    error,
  };

}