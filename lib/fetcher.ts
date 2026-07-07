export async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const resolvedInput = typeof input === "string" && input.startsWith("/") && typeof window !== "undefined"
    ? new URL(input, window.location.origin)
    : input;

  const response = await fetch(resolvedInput, {
    cache: "no-store",
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}
