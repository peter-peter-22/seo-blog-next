"use client";

import { useSearchParams } from "next/navigation";
export function useSuccessUrl() {
    const searchParams = useSearchParams();
    return searchParams.get("callbackUrl") || "/profile";
}