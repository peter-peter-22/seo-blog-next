"use client";

import { useFormContext } from "react-hook-form";
import HybridAvatar from "../HybridAvatar";

export default function LiveAvatar() {
    const { watch } = useFormContext();
    const [name,image] = watch(["name", "image"]);
    const liveUser = { name,image };
    return (
        <HybridAvatar user={liveUser} sx={{width:100,height:100,fontSize:50,mx:"auto"}}/>
    )
}