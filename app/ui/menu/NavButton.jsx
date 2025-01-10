import { LinkNoPrefetch } from '@/app/lib/LinkNoPrefetch';
import Badge from '@mui/material/Badge';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { usePathname } from "next/navigation";

export default function NavButton({ name, url, Icon, badgeProps, ...props }) {
    const pathname = usePathname();
    const active = pathname === url;
    return (
        <ListItem disablePadding>
            <ListItemButton
                component={url && LinkNoPrefetch}
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