import ErrorIcon from '@mui/icons-material/Error';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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