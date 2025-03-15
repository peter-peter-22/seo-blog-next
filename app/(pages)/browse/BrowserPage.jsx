"use client"

import ErrorPage from "@/app/ui/components/info pages/Error";
import { PageLoading } from "@/app/ui/layout/PageLoading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BrowserLayout from "./BrowserLayout";
import getFilteredArticles from './getFilteredArticles';

export default function BrowserPage() {
    const searchParams = Object.fromEntries(useSearchParams().entries());
    const {text, page, tag, sort, sortMode} = searchParams
    const [data, setData] = useState()
    const loading = !data
    const error = data?.error
    useEffect(() => {
        (async () => {
            const result = await getFilteredArticles({ text, page, tag, sort, sortMode });
            setData(result);
            if (result.error)
                console.error(result.error)
        })()
    }, [text, page, tag, sort, sortMode])

    return loading ? (
        <PageLoading />
    ) : error ? (
        <ErrorPage secondary={error} />
    ) : (
        <BrowserLayout {...{ searchParams, query: data }} />
    )
}