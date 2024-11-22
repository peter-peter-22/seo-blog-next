import NavLinks, { NavItem } from "@/app/ui/menu/NavLinks";
import List from '@mui/material/List';
import { signOut, useSession,signIn } from 'next-auth/react';
import Divider from '@mui/material/Divider';
import UserProfile from "./UserProfile";

import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const navItems = [
    new NavItem("Authenticate", undefined, <LoginIcon />,signIn),
];

const navItemsAuth = [
    new NavItem("Profile", "/profile", <PersonIcon />),
    new NavItem("Write", "/profile/write", <CreateIcon />),
    new NavItem("Logout", undefined, <LogoutIcon />, signOut),
];

export default function UserMenuContents() {
    const session = useSession();
    const isLoggedIn = session.status === "authenticated";

    return (
        <List>
            {isLoggedIn && <UserProfile user={session.data.user} />}
            <Divider component="li" />
            <NavLinks navItems={isLoggedIn ? navItemsAuth : navItems} />
        </List>
    )
}