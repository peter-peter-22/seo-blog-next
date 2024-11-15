import NavLinks, { NavItem } from "@/app/ui/menu/NavLinks"
import { signOutAction } from "@/app/lib/authActions";
import { useCallback } from "react";
import List from '@mui/material/List';
import NavButton from "@/app/ui/menu/NavButton";
import { useSession } from 'next-auth/react';

const navItems = [
    new NavItem("Login", "/login"),
    new NavItem("Register", "/register"),
];

const navItemsAuth = [
    new NavItem("Write", "/profile/write"),
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
            <NavButton name={"Logout"} onClick={logout} />
        </List>
    )
}