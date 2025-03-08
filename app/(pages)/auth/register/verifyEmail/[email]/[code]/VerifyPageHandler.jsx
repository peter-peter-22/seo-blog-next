"use client"

import ErrorPage from "@/app/ui/components/info pages/Error";
import { PageLoading } from "@/app/ui/layout/PageLoading";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import verifyEmailAction from "./verifyEmailAction";
import { VerifyPage } from "./VerifyPage";

export default function VerifyPageHandler() {
    const params = useParams()
    const { redirect } = Object.fromEntries(useSearchParams().entries());
    const [data, setData] = useState()
    const loading = !data
    const error = data?.error
    useEffect(() => {
        (async () => {
            const result = await verifyEmailAction({ ...params, redirect });
            setData(result);
            if (result.error)
                console.error(result.error)
        })()
    }, [])

    return loading ? (
        <PageLoading />
    ) : error ? (
        <ErrorPage secondary={error} />
    ) : (
        <VerifyPage {...data} />
    )
}