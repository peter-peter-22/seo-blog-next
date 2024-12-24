import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";

export function MenuButton({ active, children, title, ...props }) {
    return (
        <Tooltip title={title}>
            <IconButton color={active ? "primary" : undefined} {...props}>
                {children}
            </IconButton>
        </Tooltip>
    )
}