'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavMenu from './tabs/NavMenu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import UserMenu from './user/UserMenu';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

function HideOnScroll({ children }) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Logo = styled(Image)({
    borderRadius: 5
})

export default function Header() {
    return (
        <>
            <HideOnScroll>
                <AppBar component="header">
                    <Toolbar>
                        <NavMenu />
                        <Stack alignItems="center" sx={{ flexGrow: 1 }}>
                            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                <Logo
                                    src="/icon.jpg"
                                    width={30}
                                    height={30}
                                    alt="Logo"
                                    sx={theme => ({
                                        ...theme.applyStyles("dark", {
                                            display: "none"
                                        })
                                    })}
                                />
                                <Logo
                                    src="/icon-dark.png"
                                    width={30}
                                    height={30}
                                    alt="Logo"
                                    sx={theme => ({
                                        ...theme.applyStyles("light", {
                                            display: "none"
                                        })
                                    })}
                                />
                                <Typography
                                    variant="h6"
                                >
                                    Textmine
                                </Typography>
                            </Stack>
                        </Stack>
                        <UserMenu />
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
}