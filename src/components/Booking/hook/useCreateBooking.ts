"use client";

import { useState } from "react";
import { postBooking } from "../api/booking.api";


export type BookingResponse = {
  id: number;
  booking_number: string;
  status: string;
  total_amount: number;
};


export function useCreateBooking(){

  const [loading,setLoading] = useState(false);

  const [error,setError] = useState<string | null>(null);


  const createBooking = async(
    payload:any
  ):Promise<BookingResponse>=>{

    try{

      setLoading(true);

      const data = await postBooking(payload);

      return data;

    }
    catch(error:any){

      setError(
        error.message ?? "Booking failed"
      );

      throw error;

    }
    finally{

      setLoading(false);

    }

  };


  return {
    createBooking,
    loading,
    error
  };

}