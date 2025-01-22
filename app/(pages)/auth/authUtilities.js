"use client";

export function getSuccessUrl() {
    const client = typeof window !== 'undefined';
    if (!client)
        return "/profile";
    let searchParams = new URLSearchParams(document.location.search);
    return searchParams.get("callbackUrl") || "/profile";
}