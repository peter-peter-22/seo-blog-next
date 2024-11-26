import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BigIcon from "@/app/ui/components/BigIcon";

export default function NotFound() {
    return (
        <Stack alignItems="center" spacing={2}>
            <BigIcon>
                <ErrorOutlineIcon />
            </BigIcon>
            <Typography variant="h4">404 Not Found</Typography>
            <Typography>There is nothing here</Typography>
            <Link href="/">Back to home</Link>
        </Stack>
    );
}