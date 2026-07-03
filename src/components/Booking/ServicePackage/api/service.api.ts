import { apiFetch } from "@/lib/api";

export const getServices = async () => {
  const response = await apiFetch("/services");

  return response.data;
};