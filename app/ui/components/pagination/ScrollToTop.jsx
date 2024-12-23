"use client"
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname()
    const params = useSearchParams();
    const [first, setFirst] = useState(true);
    useEffect(() => {
        if (first)//prevent scrolling to the top after the page was loaded for the first time
            return setFirst(false);
        window.scrollTo({ top: 0 });
    }, [pathname, params, first])
}