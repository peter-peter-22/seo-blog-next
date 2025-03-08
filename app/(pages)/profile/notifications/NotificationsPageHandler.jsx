"use client"

import ErrorPage from "@/app/ui/components/info pages/Error";
import { PageLoading } from "@/app/ui/layout/PageLoading";
import { useEffect, useState } from "react";
import NotificationsPage from "./NotificationsPage";
import getNotifications from "./notificationsActions";

export default function NotificationsPageHandler() {
    const [data, setData] = useState()
    const loading = !data
    const error = data?.error
    useEffect(() => {
        (async () => {
            const result = await getNotifications();
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
        <NotificationsPage {...data} />
    )
}