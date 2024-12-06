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

    const LeftDrawer = <AuthorFilters defaultValues={searchParams} />
    const fields = {
        LeftDrawer,
        Main: <DisplayAuthors {...query} searchParams={searchParams} />,
        Left: <Card>{LeftDrawer}</Card>,
        LeftButton: BasicDrawerButton({ Icon: <FilterAltIcon /> }),
        leftBreakpoint,
    }

    return <ResponsiveLayout {...fields} symmetricWidth={240} />
}