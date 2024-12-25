"use client"

import Avatar from "@mui/material/Avatar";
import StringAvatar from "@/app/ui/layout/header/user/StringAvatar";
import { useFullscreenImage } from "../components/FullscreenImage";

export default function HybridAvatar({ user: { image, name }, sx, ...props }) {
    const alt = `the profile of ${name}`;
    const { FullscreenDialog, handleFullscreen } = useFullscreenImage({ src: image, alt })
    return (
        image ? (
            <>
                <Avatar
                    src={image}
                    alt={alt}
                    sx={{ cursor: "pointer", ...sx }}
                    onClick={handleFullscreen}
                    {...props}
                />
                {FullscreenDialog}
            </>
        ) : (
            <StringAvatar name={name} sx={sx} {...props} />
        )
    )
}