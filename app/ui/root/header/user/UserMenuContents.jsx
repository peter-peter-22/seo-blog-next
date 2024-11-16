import NavLinks, { NavItem } from "@/app/ui/menu/NavLinks"
import { signOutAction } from "@/app/actions/authActions";
import { useCallback } from "react";
import List from '@mui/material/List';
import NavButton from "@/app/ui/menu/NavButton";
import { useSession } from 'next-auth/react';

import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';

const navItems = [
    new NavItem("Login", "/login", <LoginIcon />),
    new NavItem("Register", "/register", <PersonAddIcon />),
];

const navItemsAuth = [
    new NavItem("Write", "/profile/write", <CreateIcon />),
];

export default function UserMenuContents() {
    const session = useSession();
    const isLoggedIn = session.status === "authenticated";
    const logout = useCallback(async () => {
        await signOutAction();
        session.update();
    }, []);
    return (
        <List>
            <NavLinks navItems={isLoggedIn ? navItemsAuth : navItems} />
            <NavButton name={"Logout"} onClick={logout} Icon={<LogoutIcon />} />
        </List>
    )
}