'use client';

import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import UserMenuContents from './UserMenuContents';
import Badge from '@mui/material/Badge';
import { useNotification } from '../../NotificationProvider';

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const notifications = useNotification();

    const handleDrawerToggle = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer right"
                edge="end"
                onClick={handleDrawerToggle}
            >
                <Badge color="primary" badgeContent={notifications}>
                    <PersonIcon />
                </Badge>
            </IconButton>
            <Drawer
                component="nav"
                open={open}
                onClose={handleDrawerToggle}
                anchor={"right"}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <Box onClick={handleDrawerToggle} sx={{ width: 240 }}>
                    <UserMenuContents />
                </Box>
            </Drawer>
        </>
    )
}