import prisma from "@/utils/db";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BigIcon from "@/app/ui/components/BigIcon";

export default async function Page(props) {
    const params = await props.params;
    const email = decodeURIComponent(params.email);
    const code = decodeURIComponent(params.code);

    const registrationSession = (await prisma.emailVerifications.deleteMany({
        where: {
            email,
            code
        }
    }))[0];

    const exists = !!registrationSession;
    //const isExpired=registrationSession.updatedAt;
    const isExpired = false;
    const isCorrect = exists && !isExpired;


    if (isCorrect) {
        const { username: name, password, email } = registrationSession;
        await prisma.user.upsert({
            where: { email },
            create: {
                email,
                name,
                password
            },
            update: {
                name,
                password
            }
        });
    }

    return (
        true ? (
            <Stack alignItems="center" spacing={2}>
                <BigIcon>
                    <CheckCircleOutlineIcon />
                </BigIcon>
                <Typography variant="h4">
                    Registration successful
                </Typography>
                <Typography>
                    Now you can sign in.
                </Typography>
                <Button href="/auth/login">Sign in</Button>
            </Stack>
        ) : (
            <Stack alignItems="center" spacing={2}>
                <BigIcon>
                    <ErrorOutlineIcon />
                </BigIcon>
                {isExpired ? (
                    <>
                        <Typography variant="h4">
                            Expired
                        </Typography>
                        <Typography>
                            The verification code is valid for 5 minutes.
                        </Typography>
                        <Button href="/auth/register">Try again</Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h4">
                            Incorrect code.
                        </Typography>
                        <Typography>
                            The code is valid only once.
                        </Typography>
                        <Button href="/auth/register">Try again</Button>
                        <Button href="/auth/login">Sign in</Button>
                    </>
                )}
            </Stack>
        )
    );
}