import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';

export function CommentSectionSkeleton() {
    return (
        <List>
            {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton variant="rounded" key={i} height={100} sx={{ m: 1 }} />
            ))}
        </List>
    )
}