"use client"

import { baseUrl } from '@/app/lib/serverInfo';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ListItemIcon } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useArticleDynamicData } from '../ArticleDynamicDataProvider';

export function ArticleCopyButton() {
    const { article } = useArticleDynamicData();
    const { enqueueSnackbar } = useSnackbar();

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(`${baseUrl}/articles/${article.id}`)
            .then(() => { enqueueSnackbar("Copied", { variant: "success" }) })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }, [article,enqueueSnackbar]);

    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <ContentCopyIcon />
                </ListItemIcon>
                <ListItemText primary={"Copy article URL"} onClick={handleCopy} />
            </ListItemButton>
        </ListItem>
    )
}

