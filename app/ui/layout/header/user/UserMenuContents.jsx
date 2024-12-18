"use client";

import NavButton from "@/app/ui/menu/NavButton";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { signOut, useSession } from 'next-auth/react';
import UserProfile from "./UserProfile";

import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

export default function UserMenuContents() {
    const session = useSession();
    const isLoggedIn = session.status === "authenticated";

    return (
        <List>
            {isLoggedIn && <UserProfile user={session.data.user} />}
            <Divider component="li" />
            {isLoggedIn ? (
                <>
                    <NavButton
                        name="Profile"
                        url="/profile"
                        Icon={<PersonIcon />}
                    />
                    <NavButton
                        name="Write"
                        url="/profile/write"
                        Icon={<CreateIcon />}
                    />
                    <NavButton
                        name="Notifications"
                        url="/profile/notifications"
                        Icon={<CreateIcon />}
                    />
                    <NavButton
                        name="Logout"
                        url={undefined}
                        Icon={<LogoutIcon />}
                        onClick={signOut}
                    />
                </>
            ) : (
                <>
                    <NavButton
                        name="Authenticate"
                        url="/auth/signIn"
                        Icon={<LoginIcon />}
                    />
                </>
            )}
        </List>
    )
}