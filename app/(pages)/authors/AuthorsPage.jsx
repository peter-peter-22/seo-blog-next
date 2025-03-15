"use client"

import ErrorPage from "@/app/ui/components/info pages/Error";
import { PageLoading } from "@/app/ui/layout/PageLoading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AuthorsLayout from "./AuthorsLayout";
import getFilteredUsers from "./getFilteredUsers";

export default function AuthorsPage() {
    const searchParams = Object.fromEntries(useSearchParams().entries());
    const {text, page}=searchParams
    const [data, setData] = useState()
    const loading = !data
    const error = data?.error
    useEffect(() => {
        (async () => {
            const result = await getFilteredUsers({text, page});
            setData(result);
            if (result.error)
                console.error(result.error)
        })()
    }, [text, page])

    return loading ? (
        <PageLoading />
    ) : error ? (
        <ErrorPage secondary={error} />
    ) : (
        <AuthorsLayout {...{ searchParams, query: data }} />
    )
}