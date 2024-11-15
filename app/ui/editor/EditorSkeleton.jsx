import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const rows = Array.from({ length: 40 }, () => Math.floor(Math.random() * 100));

export default function EditorSkeleton() {
    return (
        <Stack spacing={0.5}>
            {rows.map(width => (
                <Skeleton variant="text" style={{ width: `${width}vw`, fontSize: '1.5rem' }} />
            ))}
        </Stack>
    )
}