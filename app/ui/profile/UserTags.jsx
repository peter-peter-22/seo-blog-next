"use client"

import { useProfileDynamicData } from "@/app/(pages)/authors/[id]/ProfileDynamicDataProvider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export function UserTags() {
    const { user, loading } = useProfileDynamicData();

    return (
        <Stack direction="row" spacing={1} sx={{ mt: 1, overflowX: "scroll", scrollbarWidth: "none" }}>
            {loading ? (
                <Typography color="text.secondary">...</Typography>
            ) : user.AuthorTag && user.AuthorTag.length > 0 ? (
                <>
                    {user.AuthorTag.map((tag, i) => (
                        <Chip
                            label={`${tag.name} - ${tag.count}`}
                            clickable
                            component={Link}
                            size="small"
                            href={`/browse?${new URLSearchParams({ tag: tag.name, author: user.id }).toString()}`}
                            key={i}
                        />
                    ))}
                </>
            ) : (
                <Typography color="text.secondary">No articles yet</Typography>
            )}
        </Stack>
    )
}