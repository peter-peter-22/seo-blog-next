import Stack from '@mui/material/Stack';

export default function TagContainer({children,sx,...props})
{
    return (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1,...sx }} {...props}>
            {children}
        </Stack>
    )
}