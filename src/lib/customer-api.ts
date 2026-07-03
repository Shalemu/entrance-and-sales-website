import { apiFetch } from "./api";

export type CustomerType =
  | "walkin"
  | "individual"
  | "family"
  | "corporate";

export async function createCustomer(
  type: CustomerType,
  payload: any
) {
  return apiFetch("/customers", {
    method: "POST",
    body: {
      customer_type: type,
      status: true, 
      ...payload,
    },
  });
}