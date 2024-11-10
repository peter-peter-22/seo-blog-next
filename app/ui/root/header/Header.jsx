'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavMenu from './tabs/NavMenu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import UserMenu from './user/UserMenu';

function HideOnScroll({ children }) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Header() {
    return (
        <HideOnScroll>
            <AppBar component="nav" sx={{ position: "sticky", top: 0 }}>
                <Toolbar>
                    <NavMenu />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                    <UserMenu />
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}