import { apiFetch } from "@/lib/api";

export type BookingResponse = {
  booking: {
    id: number;
    booking_number: string;
    status: string;
    payment_status: string;
    subtotal: number;
    discount_amount: number;
    tax_amount: number;
    total_amount: number;
    customer: any;
    items: any[];
  };

  payment: {
    redirect_url: string;
    order_tracking_id: string;
  };
};


// CREATE BOOKING
export const postBooking = async (
  payload: any
): Promise<BookingResponse> => {

  const response = await apiFetch(
    "/bookings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  // Backend returns:
  // {
  //   success: true,
  //   message: "...",
  //   data: {
  //      booking: {...},
  //      payment: {...}
  //   }
  // }

  return response.data;
};


// TRACK BOOKING
export const trackBooking = async (
  reference: string
) => {

  const response = await apiFetch(
    `/bookings/track/${reference}`,
    {
      method: "GET",
    }
  );

  return response.data;
};