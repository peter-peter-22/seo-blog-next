import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function NavButton({ active, name, ...props }) {
    return (
        <ListItem disablePadding>
            <ListItemButton {...props}>
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