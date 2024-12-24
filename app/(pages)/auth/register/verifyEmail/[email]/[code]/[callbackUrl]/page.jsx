import BigIcon from "@/app/ui/components/BigIcon";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import prisma from "@/utils/db";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default async function Page(props) {
    const params = await props.params;
    const email = decodeURIComponent(params.email);
    const code = decodeURIComponent(params.code);
    const redirect = decodeURIComponent(params.callbackUrl);

    const firstSignIn = "/profile/newUser";
    const callbackUrl = encodeURIComponent(`${firstSignIn}?callbackUrl=${encodeURIComponent(redirect)}`);

    const registrationSession = await prisma.emailVerifications.findUnique({
        where: {
            email,
            code
        }
    });

    const exists = !!registrationSession;
    const isExpired = exists ? olderThanMinutes(registrationSession.updatedAt, 0.5) : false;
    const isCorrect = exists && !isExpired;

    if (isCorrect) {
        //upsert user and delete the registration session
        finalize(registrationSession);
    }

    return (
        <SingleColumn>
            {isCorrect ? (
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
                    <Button href={`/auth/login?callbackUrl=${callbackUrl}`}>Sign in</Button>
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
            )}
        </SingleColumn>
    );
}

function finalize(registrationSession) {
    const { username: name, password, email, code } = registrationSession;
    Promise.allSettled([
        //upsert user
        prisma.user.upsert({
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
        }),
        //delete registration session
        prisma.emailVerifications.deleteMany({
            where: {
                email,
                code
            }
        })
    ]).catch(err => { console.error(err) })
}

function olderThanMinutes(date, minutes) {
    const time = minutes * 60 * 1000;
    const currentTime = Date.now(); // Current time in milliseconds
    const inputTime = date.getTime(); // Time of the Date object in milliseconds

    return (currentTime - inputTime) > time;
}