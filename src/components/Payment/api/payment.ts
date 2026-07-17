import { apiFetch } from "@/lib/api";



export async function getPaymentStatus(
  trackingId: string
) {

  return apiFetch(
    `/pesapal/transaction-status?OrderTrackingId=${trackingId}`
  );

}