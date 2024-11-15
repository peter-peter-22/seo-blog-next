import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function NavButton({ active, name, Icon, ...props }) {
    return (
        <ListItem disablePadding>
            <ListItemButton {...props}>
                <ListItemIcon sx={{ "& svg": { color: active && "text.primary" } }}>
                    {Icon}
                </ListItemIcon>
                <ListItemText
                    primary={name}
                    primaryTypographyProps={{
                        sx: {
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            fontWeight: active && "bold"
                        }
                    }}
                />
            </ListItemButton>
        </ListItem>
    )
}