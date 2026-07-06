import { apiFetch } from "@/lib/api";

export const getServices = async () => {
  const response = await apiFetch("/branch-services");

  return response.data;
};