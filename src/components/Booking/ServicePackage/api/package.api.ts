import { apiFetch } from "@/lib/api";

export const getPackages = async (serviceId: number) => {
  const response = await apiFetch(`/packages?service_id=${serviceId}`);

  return response.data;
};