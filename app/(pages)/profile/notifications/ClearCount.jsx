"use client"

import { useNotification } from "@/app/ui/layout/NotificationProvider"
import { useEffect } from "react"

export default function ClearCount() {
    const { clear } = useNotification();
    useEffect(clear, [clear]);
}