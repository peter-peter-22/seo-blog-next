import Stack from '@mui/material/Stack';

export default function FieldContainer(props) {
    return (
        <Stack spacing={2} sx={{ alignItems: "start" }} {...props}>
            {props.children}
        </Stack>
    )
}