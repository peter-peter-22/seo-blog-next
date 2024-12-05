"use client"
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname()
    const params = useSearchParams();
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [pathname, params])
}