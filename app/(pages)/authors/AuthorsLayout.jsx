"use client";

import BasicDrawerButton from "@/app/ui/layout/BasicDrawerButton";
import { ResponsiveLayout } from "@/app/ui/layout/ResponsiveMultiColumns";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Card from '@mui/material/Card';
import AuthorFilters from "./AuthorFilters";
import AuthorsRight from "./AuthorsRight";
import DisplayAuthors from "./DisplayAuthors";

export default function AuthorsLayout({ query, searchParams }) {
    const leftBreakpoint = "lg";

    const LeftDrawer = <AuthorFilters defaultValues={searchParams} />
    const fields = {
        LeftDrawer,
        Main: <DisplayAuthors {...query} searchParams={searchParams} />,
        Left: <Card>{LeftDrawer}</Card>,
        Right: <AuthorsRight />,
        LeftButton: BasicDrawerButton({ Icon: <FilterAltIcon /> }),
        leftBreakpoint,
        rightBreakpoint: leftBreakpoint
    }

    return <ResponsiveLayout {...fields} />
}