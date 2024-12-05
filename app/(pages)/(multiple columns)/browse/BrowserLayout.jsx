"use client";

import Filters from "@/app/(pages)/(multiple columns)/browse/Filters";
import BasicDrawerButton from "@/app/ui/layout/BasicDrawerButton";
import { ResponsiveLayout } from "@/app/ui/layout/ResponsiveMultiColumns";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Card from '@mui/material/Card';
import DisplayArticles from "./DisplayArticles";
import People from './People';

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
