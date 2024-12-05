"use client";

import BasicDrawerButton from "@/app/ui/layout/BasicDrawerButton";
import { ResponsiveLayout } from "@/app/ui/layout/ResponsiveMultiColumns";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Card from '@mui/material/Card';
import DisplayAuthors from "./DisplayAuthors";
import AuthorFilters from "./AuthorFilters";

export default function AuthorsLayout({ query, searchParams }) {
    const leftBreakpoint = "md";
    const rightBreakpoint = "lg";

    const LeftDrawer = <AuthorFilters defaultValues={searchParams} />
    const RightDrawer = <p>right</p>
    const fields = {
        LeftDrawer,
        RightDrawer,
        Main: <DisplayAuthors {...query} searchParams={searchParams} />,
        Right: <Card>{RightDrawer}</Card>,
        Left: <Card>{LeftDrawer}</Card>,
        LeftButton: BasicDrawerButton({ Icon: <FilterAltIcon /> }),
        RightButton: BasicDrawerButton({ Icon: <PeopleAltIcon /> }),
        leftBreakpoint,
        rightBreakpoint
    }

    return <ResponsiveLayout {...fields} />
}