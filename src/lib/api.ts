// lib/api.ts
export interface ApiOptions extends RequestInit {
  body?: any;
  auth?: boolean; //control whether token is used
}

export async function apiFetch(
  endpoint: string,
  options: ApiOptions = {}
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) throw new Error("API base URL is not defined!");

  const { auth = false, body, ...rest } = options;

  // only get token if auth is required
  const token =
    typeof window !== "undefined" && auth
      ? localStorage.getItem("token")
      : null;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...(rest.headers as any),
  };

  const finalBody =
    body && typeof body !== "string" ? JSON.stringify(body) : body;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...rest,
    headers,
    body: finalBody,
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  const data = isJson ? await response.json() : {};

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}