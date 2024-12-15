import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BigIcon from "@/app/ui/components/BigIcon";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { SingleColumn } from '@/app/ui/layout/Layouts';

export default function Page() {
    return (
        <SingleColumn>
            <Stack alignItems="center" spacing={2}>
                <BigIcon>
                    <MailOutlineIcon />
                </BigIcon>
                <Typography variant="h4">
                    Email sent
                </Typography>
                <Typography>
                    Open the link in the email to continue.
                </Typography>
                <Button href="/auth/register">Try again</Button>
            </Stack>
        </SingleColumn>
    )
}