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

const Comment = memo(({ comment, openCommentDialog }) => {
    return (
        <ListItem
            secondaryAction={
                <>
                    <IconButton
                        aria-label="reply"
                        onClick={openCommentDialog(comment.user)}
                    >
                        <CommentIcon />
                    </IconButton>
                </>
            }
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
                    </>
                }
            />
        </ListItem>
    )
}, (prev, next) => prev.comment?.id === next.comment?.id);

export default Comment;