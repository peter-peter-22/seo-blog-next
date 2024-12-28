"use client"

import { notificationCountAction } from "@/app/actions/notificationActions";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { createContext, useCallback, useContext, useEffect, useState } from "react"

const NotificationContext = createContext({ count: 0, clear: null });

export default function NotificationProvider({ children }) {
    const session = useSession();
    const isLoggedIn = !!session?.data?.user;
    const [count, setCount] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        notificationCountAction().then(({ count: newCount, error }) => {
            if (error)
                return enqueueSnackbar(error.toString(), { variant: "error" });
            setCount(newCount);
        })
    }, [isLoggedIn, enqueueSnackbar]);

    const clear = useCallback(() => {
        setCount(0)
    }, []);

    return (
        <NotificationContext.Provider value={{ count, clear }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotification() {
    return useContext(NotificationContext);
}