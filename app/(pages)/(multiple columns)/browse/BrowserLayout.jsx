"use client";

import Filters from "@/app/(pages)/(multiple columns)/browse/Filters";
import BasicDrawerButton from "@/app/ui/layout/BasicDrawerButton";
import { MultipleColumnsAssymetric } from "@/app/ui/layout/Layouts";
import { SideDrawer } from "@/app/ui/layout/ResponsiveMultiColumns";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NoSsr from "@mui/material/NoSsr";
import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DisplayArticles from "./DisplayArticles";
import People from './People';
import { ResponsiveLayout } from "@/app/ui/layout/ResponsiveMultiColumns";
import Card from '@mui/material/Card';

//export default function BrowserLayout({ query, searchParams }) {
//    const theme = useTheme();
//    const showLeft = useMediaQuery(theme.breakpoints.up("md"));
//    const showRight = useMediaQuery(theme.breakpoints.up("lg"));
//
//    const Main = <DisplayArticles {...query} {...{ searchParams }} />
//    const Left = <Filters defaultValues={searchParams} />
//    const Right = <People articles={query.articles} />
//
//    return <>
//        <MultipleColumnsAssymetric
//            Left={
//                <Box sx={theme => ({
//                    [theme.breakpoints.down("md")]: { display: "none" }
//                })}>
//                    {Left}
//                </Box>
//            }
//
//            Right={
//                <Box sx={theme => ({
//                    [theme.breakpoints.down("lg")]: { display: "none" }
//                })}>
//                    {Right}
//                </Box>
//            }
//            Main={Main}
//        />
//        <NoSsr>
//            {!showLeft && <SideDrawer anchor="left" Content={Left} ToggleButton={BasicDrawerButton({ Icon: <FilterAltIcon /> })} />}
//            {!showRight && <SideDrawer anchor="right" Content={Right} ToggleButton={BasicDrawerButton({ Icon: <PeopleAltIcon /> })} />}
//        </NoSsr>
//    </>
//}

export default function BrowserLayout({ query, searchParams }) {
    const leftBreakpoint = "md";
    const rightBreakpoint = "lg";

    const LeftDrawer = <Filters defaultValues={searchParams} />
    const RightDrawer = <People articles={query.articles} />
    const fields = {
        LeftDrawer,
        RightDrawer,
        Main: <DisplayArticles {...query} {...{ searchParams }} />,
        Right: <Card>{RightDrawer}</Card>,
        Left: <Card>{LeftDrawer}</Card>,
        LeftButton: BasicDrawerButton({ Icon: <FilterAltIcon /> }),
        RightButton: BasicDrawerButton({ Icon: <PeopleAltIcon /> }),
        leftBreakpoint,
        rightBreakpoint
    }

    return <ResponsiveLayout {...fields} />
}
