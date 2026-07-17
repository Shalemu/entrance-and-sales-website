// lib/api.ts

export interface ApiOptions extends RequestInit {
  body?: any;
  auth?: boolean;
}

export async function apiFetch(
  endpoint: string,
  options: ApiOptions = {}
) {

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "API base URL is not defined."
    );
  }

  const {
    auth = false,
    body,
    ...rest
  } = options;

  const token =
    typeof window !== "undefined" && auth
      ? localStorage.getItem("token")
      : null;

  const headers: Record<string, string> = {

    Accept: "application/json",

    "Content-Type": "application/json",

    ...(auth && token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),

    ...(rest.headers as any),
  };

  const response = await fetch(
    `${baseUrl}${endpoint}`,
    {
      ...rest,
      headers,
      body:
        body &&
        typeof body !== "string"
          ? JSON.stringify(body)
          : body,
    }
  );

  const contentType =
    response.headers.get("content-type");

  const data =
    contentType?.includes("application/json")
      ? await response.json()
      : null;

  if (!response.ok) {

    console.error(
      "API ERROR STATUS:",
      response.status
    );

    console.error(
      "API ERROR RESPONSE:",
      data
    );

    let message =
      data?.error ??
      data?.message ??
      "Something went wrong.";

    // Handle Laravel validation errors
    if (
      response.status === 422 &&
      data?.errors
    ) {

      const firstError =
        Object.values(data.errors)
          .flat()[0];

      if (firstError) {
        message = String(firstError);
      }
    }

    throw new Error(message);
  }

  return data;
}