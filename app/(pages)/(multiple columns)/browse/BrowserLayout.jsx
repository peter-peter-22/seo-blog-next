"use client";

import Filters from "@/app/(pages)/(multiple columns)/browse/Filters";
import BasicDrawerButton from "@/app/ui/layout/BasicDrawerButton";
import { MultipleColumnsAssymetric } from "@/app/ui/layout/Layouts";
import { SideDrawer } from "@/app/ui/layout/ResponsiveMultiColumns";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { NoSsr } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DisplayArticles from "./DisplayArticles";
import People from './People';

export default function BrowserLayout({ query, searchParams }) {
    const theme = useTheme();
    const showLeft = useMediaQuery(theme.breakpoints.up("md"));
    const showRight = useMediaQuery(theme.breakpoints.up("lg"));

    const Main = <DisplayArticles {...query} {...{ searchParams }} />
    const Left = <Filters defaultValues={searchParams} />
    const Right = <People articles={query.articles} />

    return <NoSsr>
        <MultipleColumnsAssymetric
            Left={showLeft && Left}
            Right={showRight && Right}
            Main={Main}
        />
        {!showLeft && <SideDrawer anchor="left" Content={Left} ToggleButton={BasicDrawerButton({ Icon: <FilterAltIcon /> })} />}
        {!showRight && <SideDrawer anchor="right" Content={Right} ToggleButton={BasicDrawerButton({ Icon: <PeopleAltIcon /> })} />}
    </NoSsr>
}
