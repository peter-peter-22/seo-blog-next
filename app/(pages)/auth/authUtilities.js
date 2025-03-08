"use client";

import getProfileLink from "@/app/ui/components/users/getProfileLink";
import { useSession } from "next-auth/react";

export function getSuccessUrl() {
    const session = useSession();
    let searchParams = new URLSearchParams(document.location.search);
    return searchParams.get("callbackUrl") || getProfileLink(session?.data?.user);
}