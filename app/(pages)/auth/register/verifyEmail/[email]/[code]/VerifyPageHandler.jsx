"use client"

import ErrorPage from "@/app/ui/components/info pages/Error";
import { PageLoading } from "@/app/ui/layout/PageLoading";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import verifyEmailAction from "./verifyEmailAction";
import { VerifyPage } from "./VerifyPage";

export default function VerifyPageHandler() {
    const params = useParams()
    const { email, code } = params
    const { redirect } = Object.fromEntries(useSearchParams().entries());
    const [data, setData] = useState()
    const loading = !data
    const error = data?.error
    useEffect(() => {
        (async () => {
            const result = await verifyEmailAction({ email, code, redirect });
            setData(result);
            if (result.error)
                console.error(result.error)
        })()
    }, [email, code, redirect])

    return loading ? (
        <PageLoading />
    ) : error ? (
        <ErrorPage secondary={error} />
    ) : (
        <VerifyPage {...data} />
    )
}