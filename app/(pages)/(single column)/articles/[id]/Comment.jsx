"use client";

import getProfileLink from '@/app/ui/components/users/getProfileLink';
import HybridAvatar from '@/app/ui/profile/HybridAvatar';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useState, useTransition } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSession } from 'next-auth/react';
import formatDate from '@/app/ui/utilities/formatDate';
import { useSnackbar } from 'notistack';
import ConfirmDialog from '@/app/ui/dialogs/ConfirmDialog';
import { deleteCommentAction } from '@/app/actions/commentActions';

const Comment = memo(({ comment, openCommentDialog, onDelete }) => {
    const session = useSession();
    const userId = session?.data?.user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [deleting, startDelete] = useTransition();
    const [dialogOpen, setDialogOpen] = useState(false);

    const closeDialog = useCallback(() => {
        setDialogOpen(false);
    }, [])

    const deletePromt = useCallback(() => {
        setDialogOpen(true);
    }, [])

    const handleDelete = useCallback(() => {
        startDelete(
            async () => {
                try {
                    await deleteCommentAction({id:comment.id});
                    enqueueSnackbar("Comment deleted");
                    onDelete(comment.id);
                }
                catch (err) {
                    enqueueSnackbar(err.toString(), { variant: "error" });
                }
            }
        )
    }, [])

    return (
        <>
            <ListItem
                secondaryAction={
                    <>
                        {userId === comment.userId &&
                            <>
                                <IconButton
                                    aria-label="delete"
                                    onClick={deletePromt}
                                    disabled={deleting}
                                >
                                    <DeleteIcon />
                                </IconButton>

                                <IconButton
                                    aria-label="edit"
                                    onClick={openCommentDialog({ updating: comment })}
                                >
                                    <EditIcon />
                                </IconButton>
                            </>
                        }
                        <IconButton
                            aria-label="reply"
                            onClick={openCommentDialog({ replyingTo: comment.user })}
                        >
                            <CommentIcon />
                        </IconButton>
                    </>
                }
                alignItems="flex-start"
            >
                <ListItemAvatar>
                    <HybridAvatar user={comment.user} />
                </ListItemAvatar>
                <ListItemText
                    primary={<Link href={getProfileLink(comment.user)} color="inherit">{comment.user.name}</Link>}
                    secondary={
                        <>
                            {comment.replyingTo &&
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                    sx={{ mr: 1 }}
                                    component="span"
                                >
                                    {`To ${comment.replyingTo.name}`}
                                </Typography>
                            }
                            <Typography
                                color="text.primary"
                                component="span"
                            >
                                {comment.text}
                            </Typography>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ display: "block" }}
                            >
                                {formatDate(comment.createdAt)}
                            </Typography>
                        </>
                    }
                />
            </ListItem>
            <ConfirmDialog
                open={dialogOpen}
                callback={handleDelete}
                onClose={closeDialog}
                title={"Do you want to deleted this comment?"}
                body="The comment cannot be restored after deletion."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    )
}, (prev, next) => prev.comment === next.comment);

export default Comment;