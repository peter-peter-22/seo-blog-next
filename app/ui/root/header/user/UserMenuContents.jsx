import NavLinks, { NavItem } from "@/app/ui/menu/NavLinks";
import List from '@mui/material/List';
import { signOut, useSession } from 'next-auth/react';

import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const navItems = [
    new NavItem("Authenticate", "/auth", <LoginIcon />),
];

const navItemsAuth = [
    new NavItem("Write", "/profile/write", <CreateIcon />),
    new NavItem("Logout", "#", <LogoutIcon />, signOut),
];

export default function UserMenuContents() {
    const session = useSession();
    const isLoggedIn = session.status === "authenticated";

    return (
        <List>
            <NavLinks navItems={isLoggedIn ? navItemsAuth : navItems} />
        </List>
    )
}