"use client";

import { getDraftName } from "@/app/ui/editor/ArticleEditor";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function ArticleEditDialog({ article }) {
    const router = useRouter();

    const handleClick = useCallback(() => {
        //copy the article of this page to the draft save then open the editor
        localStorage.setItem(getDraftName(true), JSON.stringify(article));
        router.push("/profile/write/update");
    }, [article])

    return <>
        <Card>
            <CardContent>
                <Typography color="text.secondary">
                    This article belongs to you.
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleClick}>
                    Edit
                </Button>
            </CardActions>
        </Card  >
        <Toolbar />
    </>
}