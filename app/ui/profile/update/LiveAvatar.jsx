"use client";

import { useFormContext } from "react-hook-form";
import HybridAvatar from "../HybridAvatar";
import { useDebounce } from 'use-debounce';
import { memo, useMemo } from "react";

export default function LiveAvatar() {
    const { watch } = useFormContext();
    const [name, image] = watch(["name", "image"]);
    const liveUser = useMemo(() => ({ name, image }), [name, image]);
    const [liveUserDebounced] = useDebounce(liveUser, 300);
    return (
        <HybridAvatarMemo user={liveUserDebounced} />
    )
}

const HybridAvatarMemo = memo(({ user }) => {
    return (
        <HybridAvatar user={user} sx={{ width: 100, height: 100, fontSize: 50, mx: "auto" }} />
    )
})