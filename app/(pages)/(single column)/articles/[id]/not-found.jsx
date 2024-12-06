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
            <Typography variant="h4">This article does not exists</Typography>
            <Typography>This article was deleted or never existed.</Typography>
            <Link href="/">Back to home</Link>
        </Stack>
    );
}