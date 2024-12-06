"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCallback, useEffect, useState } from "react";
import { MainContainer } from './Layouts';
import NoSsr from "@mui/material/NoSsr";

export function SideDrawer({ anchor, Content, ToggleButton }) {
    const [open, setOpen] = useState(false);
    const toggle = useCallback(() => { setOpen(prev => !prev) }, []);

    //button animation
    const [buttonVisible, setButtonVisible] = useState(false);
    useEffect(() => {
        setButtonVisible(true);
    }, []);

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
                sx={{ overflowY: "scroll" }}
            >
                {Content}
            </Drawer>
            <DrawerButtonContainer anchor={anchor}>
                <ToggleButton toggle={toggle} visible={buttonVisible} anchor={anchor} />
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

export function ResponsiveLayout({ Left, Main, Right, LeftDrawer, RightDrawer, rightBreakpoint, leftBreakpoint, LeftButton, RightButton, symmetricWidth }) {
    const theme = useTheme();
    const showLeft = useMediaQuery(theme.breakpoints.up(leftBreakpoint ?? "xs"));
    const showRight = useMediaQuery(theme.breakpoints.up(rightBreakpoint ?? "xs"));

    return <>
        <Stack direction="row" justifyContent={"center"}>
            <Box sx={{ flex: symmetricWidth && 1, display: "flex" }}>
                {Left &&
                    <Stack
                        direction="row"
                        sx={theme => ({
                            [theme.breakpoints.down(leftBreakpoint)]: { display: "none" },
                            ml: "auto"
                        })}
                    >
                        <Container sx={{ width: "fit-content", m: 0, minWidth: symmetricWidth }}>
                            {Left}
                        </Container>
                        <Divider orientation="vertical" />
                    </Stack>
                }
            </Box>

            <MainContainer sx={{ flexShrink: 1, display: "flex", flexDirection: "column", m: 0 }} >
                {Main}
            </MainContainer>

            <Box sx={{ flex: symmetricWidth && 1, display: "flex", minWidth: symmetricWidth }}>
                {Right &&
                    <Stack
                        direction="row"
                        sx={theme => ({
                            [theme.breakpoints.down(rightBreakpoint)]: { display: "none" },
                            mr: "auto"
                        })}
                    >
                        <Divider orientation="vertical" />
                        <Container sx={{ width: "fit-content", m: 0, minWidth: symmetricWidth }}>
                            {Right}
                        </Container>
                    </Stack>
                }
            </Box>
        </Stack>
        <NoSsr>
            {LeftDrawer && !showLeft && <SideDrawer anchor="left" Content={LeftDrawer} ToggleButton={LeftButton} />}
            {RightDrawer && !showRight && <SideDrawer anchor="right" Content={RightDrawer} ToggleButton={RightButton} />}
        </NoSsr>
    </>
}