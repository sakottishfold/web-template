"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function ApiStatus() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const res = await api.api.health.$get();
      if (!res.ok) throw new Error("API unreachable");
      return res.json();
    },
  });

  const label = isLoading ? "checking…" : isError ? "offline" : (data?.status ?? "unknown");
  const color = isLoading ? "bg-yellow-500" : isError ? "bg-red-500" : "bg-green-500";

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
      <span className={`size-2 rounded-full ${color}`} />
      API: {label}
    </span>
  );
}
