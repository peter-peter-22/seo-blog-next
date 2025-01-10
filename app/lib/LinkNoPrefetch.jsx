"use client"

import Link from "next/link";

export function LinkNoPrefetch({ children, ...props }) {
    return <Link prefetch={false} {...props}>{children}</Link>
}