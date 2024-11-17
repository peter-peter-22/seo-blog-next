'use client';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <Stack alignItems="center" spacing={2}>
            <ErrorOutlineIcon color="disabled" sx={{ fontSize: 80 }} />
            <Typography variant="h4">Something went wrong</Typography>
            <Typography>{error.toString()}</Typography>
            <Button onClick={reset}>Try again</Button>
        </Stack>
    );
}