"use client";

import { useSuccessUrl } from '@/app/(pages)/auth/authUtilities';
import { PrimaryButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { signIn } from 'next-auth/react';

import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function SignInPage() {
    const successUrl = useSuccessUrl();
    return (
        <Container maxWidth="xs" component={"main"}>
            <Card>
                <CardContent>
                    <Typography variant='h5' component="h1">Authenticate</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack alignItems="center" sx={{ "& Button": { width: 200 } }}>
                        <Button
                            startIcon={<GitHubIcon />}
                            onClick={() => signIn("github", { callbackUrl: successUrl })}
                        >
                            Github
                        </Button>
                        <Button
                            startIcon={<GoogleIcon />}
                            onClick={() => signIn("google", { callbackUrl: successUrl })}
                        >
                            Google
                        </Button>
                    </Stack>

                    <Divider sx={{ my: 3 }}>or</Divider>

                    <Stack direction="row" justifyContent={"space-between"} sx={{ width: "100%" }}>
                        <SecondaryButton
                            href={`/auth/login?callbackUrl=${successUrl}`}
                            startIcon={<LoginIcon />}
                        >
                            Login
                        </SecondaryButton>
                        <PrimaryButton
                            href={`/auth/register?callbackUrl=${successUrl}`}
                            startIcon={<PersonAddIcon />}
                        >
                            Register
                        </PrimaryButton>
                    </Stack>
                </CardContent>
            </Card>
        </Container >
    );
}