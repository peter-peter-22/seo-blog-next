'use client';

import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import MenuContents from './MenuContents';

export default function NavMenu()  {
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                component="nav"
                open={open}
                onClose={handleDrawerToggle}
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