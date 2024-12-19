import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import Badge from '@mui/material/Badge';

export default function NavButton({ name, url, Icon, badgeProps, ...props }) {
    const pathname = usePathname();
    const active = pathname === url;
    return (
        <ListItem disablePadding>
            <ListItemButton
                component={url && Link}
                href={url}
                selected={active}
                {...props}
            >
                <Badge {...badgeProps}>
                    <ListItemIcon sx={{ "& svg": { color: active && "text.primary" } }}>
                        {Icon}
                    </ListItemIcon>
                </Badge>
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