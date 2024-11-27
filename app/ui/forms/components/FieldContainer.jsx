import Stack from '@mui/material/Stack';

export default function FieldContainer({ margin, spacing = 2, ...props }) {
    return (
        <Stack spacing={spacing} sx={{ alignItems: "start", my: margin && 2, "& > .MuiDivider-root":{width:"100%"} }} {...props}>
            {props.children}
        </Stack>
    )
}