"use client";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useCallback, useState } from "react";

export function SideDrawer({ anchor, Content, ToggleButton }) {
    const [open, setOpen] = useState(false);
    const toggle = useCallback(() => { setOpen(prev => !prev) }, []);

    return (
        <>
            <Drawer
                anchor={anchor}
                variant="temporary"
                ModalProps={{
                    keepMounted: true,
                }}
                open={open}
                onClose={() => { setOpen(false) }}
            >
                {Content}
            </Drawer>
            <DrawerButtonContainer anchor={anchor}>
                <ToggleButton toggle={toggle}  />
            </DrawerButtonContainer>
        </>
    )
}

export function DrawerButtonContainer({ children, anchor }) {
    return (
        <Box sx={{ position: "fixed", bottom: 0, [anchor]: 0 }}>
            {children}
        </Box>
    )
}