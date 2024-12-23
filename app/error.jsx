'use client';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import BigIcon from "@/app/ui/components/BigIcon";

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <Stack alignItems="center" spacing={2} sx={{ my: 'auto' }}>
            <BigIcon>
                <ErrorOutlineIcon />
            </BigIcon>
            <Typography variant="h4">Something went wrong</Typography>
            <Typography>{error.toString()}</Typography>
            <Button onClick={reset}>Try again</Button>
        </Stack>
    );
}