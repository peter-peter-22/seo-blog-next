"use client";

import { isOnServer } from "@/app/lib/isOnServer";
import getProfileLink from "@/app/ui/components/users/getProfileLink";
import { useSession } from "next-auth/react";

export function useSuccessUrl() {
    const session = useSession();
    if (isOnServer())
        return ""
    let searchParams = new URLSearchParams(document.location.search);
    return searchParams.get("callbackUrl") || getProfileLink(session?.data?.user);
}