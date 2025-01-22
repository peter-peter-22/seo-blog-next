"use client";

import { getDraftName } from '@/app/ui/editor/useDraft';
import { ListItemIcon } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useArticleDynamicData } from '../ArticleDynamicDataProvider';

export default function ArticleEditButton() {
    const router = useRouter();
    const { staticArticle, isMine } = useArticleDynamicData();

    const handleEdit = useCallback(() => {
        //copy the article of this page to the draft save then open the editor
        localStorage.setItem(getDraftName(true), JSON.stringify(staticArticle));
        router.push(`/profile/write/update/${staticArticle.id}`);
    }, [staticArticle, router])

    if (!isMine)
        return;
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText primary={"Edit"} onClick={handleEdit} />
            </ListItemButton>
        </ListItem>
    )
}