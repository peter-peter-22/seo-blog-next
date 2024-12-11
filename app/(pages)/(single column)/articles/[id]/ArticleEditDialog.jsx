"use client";

import { deleteArticleAction } from '@/app/actions/articleActions';
import ConfirmDialog from '@/app/ui/dialogs/ConfirmDialog';
import { getDraftName } from "@/app/ui/editor/ArticleEditor";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useSnackbar } from 'notistack';
import { useCallback, useState } from "react";

export default function ArticleEditDialog({ article }) {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleEdit = useCallback(() => {
        //copy the article of this page to the draft save then open the editor
        localStorage.setItem(getDraftName(true), JSON.stringify(article));
        router.push(`/profile/write/update/${article.id}`);
    }, [article])

    const closeDialog = useCallback(() => {
        setDialogOpen(false);
    }, [])

    const deletePromt = useCallback(() => {
        setDialogOpen(true);
    }, [])

    const handleDelete = useCallback(async () => {
        try {
            await deleteArticleAction({ id: article.id });
            enqueueSnackbar("Article deleted");
            closeDialog();
        }
        catch (err) {
            enqueueSnackbar(err.toString(), { variant: "error" });
        }
    }, [])

    return <>
        <Card>
            <CardContent>
                <Typography color="text.secondary">
                    This article belongs to you.
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleEdit}>
                    Edit
                </Button>
                <Button onClick={deletePromt}>
                    Delete
                </Button>
            </CardActions>
        </Card  >
        <Toolbar />
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
}