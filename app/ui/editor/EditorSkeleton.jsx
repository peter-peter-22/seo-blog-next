"use client"

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const rows = Array.from({ length: 40 });

export default function EditorSkeleton() {
    return (
        <Stack spacing={0.5}>
            {rows.map((_, i) => (
                <Skeleton variant="text" key={i} style={{ width: `${i & 1 ? 50 : 100}%`, fontSize: '1.5rem' }} />
            ))}
        </Stack>
    )
}