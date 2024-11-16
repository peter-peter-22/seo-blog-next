"use client";

import { Divider } from '@mui/material';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton } from '../ui/forms/components/FormButtons';
import { signIn } from 'next-auth/react';
import { useSuccessUrl } from '@/app/auth/authUtilities';

import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Page() {
    const successUrl = useSuccessUrl();

    return (
        <Container maxWidth="xs" >
            <Card>
                <CardContent>
                    <Typography variant='h5'>Choose a way to authenticate</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack alignItems="center" sx={{ "& Button": { width: 200 } }}>
                        <Button
                            startIcon={<GitHubIcon />}
                            onClick={() => signIn("github", { callbackUrl: successUrl })}
                        >
                            Github
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
            <Toolbar />
            <Card>
                <CardContent>
                    <Typography variant='h5'>Anonymous methods</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" justifyContent={"space-between"} sx={{ width: "100%" }}>
                        <SecondaryButton
                            LinkComponent={Link}
                            href={`/auth/login?callbackUrl=${successUrl}`}
                            startIcon={<LoginIcon />}
                        >
                            Login
                        </SecondaryButton>
                        <PrimaryButton
                            LinkComponent={Link}
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