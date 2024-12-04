import Stack from '@mui/material/Stack';

export default function TagContainer({children})
{
    return (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {children}
        </Stack>
    )
}