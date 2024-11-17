import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function NotFound() {
    return (
        <Stack alignItems="center" spacing={2}>
            <ErrorOutlineIcon color="disabled" sx={{ fontSize: 80 }} />
            <Typography variant="h4">404 Not Found</Typography>
            <Typography>There is nothing here</Typography>
            <Link href="/">Back to home</Link>
        </Stack>
    );
}