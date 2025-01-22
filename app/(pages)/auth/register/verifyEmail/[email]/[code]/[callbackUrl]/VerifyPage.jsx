"use client"

import BigIcon from "@/app/ui/components/BigIcon";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import { PageLoading } from "@/app/ui/layout/PageLoading";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { NoSsr } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function VerifyPage({isCorrect,callbackUrl,isExpired}) {
    return (
        <NoSsr fallback={<PageLoading />}>
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
        </NoSsr>
    )
}