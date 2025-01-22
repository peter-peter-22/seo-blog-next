"use client";

import { deleteArticleAction } from '@/app/actions/articleActions';
import ConfirmDialog from '@/app/ui/dialogs/ConfirmDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemIcon } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from "react";
import { useArticleDynamicData } from '../ArticleDynamicDataProvider';

export default function ArticleDeleteButton() {
    const { article, isMine } = useArticleDynamicData();

    const { enqueueSnackbar } = useSnackbar();
    const [dialogOpen, setDialogOpen] = useState(false);

    const closeDialog = useCallback(() => {
        setDialogOpen(false);
    }, [])

    const deletePromt = useCallback(() => {
        setDialogOpen(true);
    }, [])

    const handleDelete = useCallback(async () => {
        const res = await deleteArticleAction({ id: article.id });
        if (res?.error)
            return enqueueSnackbar(res.error.toString(), { variant: "error" });
        enqueueSnackbar("Article deleted");
        closeDialog();
    }, [article, closeDialog, enqueueSnackbar])

    if (!isMine)
        return;
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Delete"} onClick={deletePromt} />
                </ListItemButton>
            </ListItem>
            <ConfirmDialog
                open={dialogOpen}
                callback={handleDelete}
                onClose={closeDialog}
                title={"Do you want to deleted this article?"}
                body="The article cannot be restored after deletion."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    )
}