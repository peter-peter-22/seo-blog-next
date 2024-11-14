'use client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem(name, url, onClick) {
    this.name = name;
    this.url = url;
    this.onClick = onClick;
}

export default function NavLinks({ navItems }) {
    const pathname = usePathname();
    return (
        <List>
            {navItems.map(({ name, url, onClick }, i) => (
                <Link
                    href={url}
                    style={{
                        color: "unset",
                        textDecoration: "unset",
                    }}
                    onClick={onClick}
                    key={i}
                >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText
                                primary={name}
                                primaryTypographyProps={{
                                    sx: {
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        fontWeight: pathname === url && "bold"
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}
        </List>
    )
}