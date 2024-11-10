'use client';

import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import MenuContents from "@/app/ui/root/header/tabs/MenuContents";

export default function UserMenu() {
    const [open, setOpen] = useState(false);

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
                <PersonIcon />
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
                    <MenuContents />
                </Box>
            </Drawer>
        </>
    )
}