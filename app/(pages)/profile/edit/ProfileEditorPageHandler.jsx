"use client"

import ErrorPage from "@/app/ui/components/info pages/Error";
import { PageLoading } from "@/app/ui/layout/PageLoading";
import { useEffect, useState } from "react";
import getProfileEditorData from "./getProfileEditorData";
import ProfileEditorPage from "./ProfileEditorPage";

export default function ProfileEditorPageHandler() {
    const [data, setData] = useState()
    const loading = !data
    const error = data?.error
    useEffect(() => {
        (async () => {
            const result = await getProfileEditorData();
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
        <ProfileEditorPage {...data} />
    )
}