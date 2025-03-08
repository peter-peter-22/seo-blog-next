import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BigIcon from "@/app/ui/components/BigIcon";

export default function ErrorPage({ Icon = <ErrorOutlineIcon />, title = "Error", secondary = "Something went wrong." }) {
    return (
        <Stack alignItems="center" spacing={2}>
            <BigIcon>
                {Icon}
            </BigIcon>
            <Typography variant="h4">{title}</Typography>
            {secondary && <Typography>{secondary}</Typography>}
            <Link href="/">Back to home</Link>
        </Stack>
    );
}