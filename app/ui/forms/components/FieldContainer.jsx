import Stack from '@mui/material/Stack';

export default function FieldContainer({margin,...props}) {
    return (
        <Stack spacing={2} sx={{ alignItems: "start",my:margin&&2 }} {...props}>
            {props.children}
        </Stack>
    )
}