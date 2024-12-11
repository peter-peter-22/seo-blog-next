import getProfileLink from '@/app/ui/components/users/getProfileLink';
import HybridAvatar from '@/app/ui/profile/HybridAvatar';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSession } from 'next-auth/react';
import formatDate from '@/app/ui/utilities/formatDate';

const Comment = memo(({ comment, openCommentDialog }) => {
    const session = useSession();
    const userId = session?.data?.user?.id;
    return (
        <ListItem
            secondaryAction={
                <>
                    {userId === comment.userId &&
                        <>
                            <IconButton
                                aria-label="delete"
                                onClick={openCommentDialog()}
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
    )
}, (prev, next) => prev.comment?.id === next.comment?.id);

export default Comment;