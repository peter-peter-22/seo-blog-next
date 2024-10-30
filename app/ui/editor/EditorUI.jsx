import IconButton from '@mui/material/IconButton';

export function MenuButton({ active, children,...props }) {
    return (
        <IconButton color={active?"primary":undefined} {...props}>
            {children}
        </IconButton>
    )
}