import { apiFetch } from "@/lib/api";

export const getGroupTypes  = async () => {
  const response = await apiFetch("/grouptype");

  return response.data;
};