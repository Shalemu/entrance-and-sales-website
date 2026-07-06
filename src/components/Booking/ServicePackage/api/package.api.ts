
import { apiFetch } from "@/lib/api";

export const getPackages= async () => {
  const response = await apiFetch("/packages");

  return response.data;
};