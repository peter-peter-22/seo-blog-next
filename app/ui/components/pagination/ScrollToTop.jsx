"use client"
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

export default function ScrollToTop() {
    return (
        <Suspense>
            <ScrollToTopInner />
        </Suspense>
    )
}

function ScrollToTopInner() {
    const pathname = usePathname()
    const params = useSearchParams();
    const first = useRef(true);
    useEffect(() => {
        if (first.current)//prevent scrolling to the top after the page was loaded for the first time
        {
            first.current = false;
            return
        }
        window.scrollTo({ top: 0 });
    }, [pathname, params, first])
}