"use client";

import { deleteCommentAction } from '@/app/actions/commentActions';
import getProfileLink from '@/app/ui/components/users/getProfileLink';
import ConfirmDialog from '@/app/ui/dialogs/ConfirmDialog';
import HybridAvatar from '@/app/ui/profile/HybridAvatar';
import formatDate from '@/app/ui/utilities/formatDate';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { memo, useCallback, useState } from 'react';

const Comment = memo(function CommentBase({ comment, openCommentDialog, onDelete }) {
    const session = useSession();
    const userId = session?.data?.user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [dialogOpen, setDialogOpen] = useState(false);

    const closeDialog = useCallback(() => {
        setDialogOpen(false);
    }, [])

    const deletePromt = useCallback(() => {
        setDialogOpen(true);
    }, [])

    const handleDelete = useCallback(async () => {
        const res = await deleteCommentAction({ id: comment.id });
        if (res?.error)
            return enqueueSnackbar(res.error.toString(), { variant: "error" });
        closeDialog();
        enqueueSnackbar("Comment deleted");
        onDelete(comment.id);
    }, [closeDialog, comment, enqueueSnackbar, onDelete])

    return (
        <>
            <ListItem
                alignItems="flex-start"
            >
                <ListItemAvatar>
                    <HybridAvatar user={comment.user} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography>
                            <Link href={getProfileLink(comment.user)} color="inherit">{comment.user.name}</Link>
                        </Typography>
                    }
                    disableTypography
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
                            <Typography variant="body2" color="textSecondary">
                                {formatDate(comment.createdAt)}
                            </Typography>
                            <div>
                                <Tooltip title="Comment" >
                                    <IconButton
                                        aria-label="reply"
                                        onClick={openCommentDialog({ replyingTo: comment.user })}
                                        size="small"
                                        edge="start"
                                    >
                                        <CommentIcon />
                                    </IconButton>
                                </Tooltip>
                                {userId === comment.userId &&
                                    <>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={deletePromt}
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Edit">
                                            <IconButton
                                                aria-label="edit"
                                                onClick={openCommentDialog({ updating: comment })}
                                                size="small"
                                                edge="end"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                }
                            </div>
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