import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import formatDate from "@/app/ui/utilities/formatDate";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from "@mui/material/List";

import ReviewsIcon from '@mui/icons-material/Reviews';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';

export default function Notification({ notification }) {
    return (
        <ListItem disablePadding>
            {notification.type == "like" ? (
                <Like notification={notification} />
            ) : notification.type == "comment" ? (
                <Comment notification={notification} />
            ) : (
                <Reply notification={notification} />
            )}
        </ListItem>
    )
}

function Like({ notification: { count, articleId, article, unread } }) {
    return (
        <ListItemButton
            LinkComponent={Link}
            href={`/articles/${articleId}`}
            selected={unread}
        >
            <ListItemIcon>
                <ThumbUpIcon />
            </ListItemIcon>
            <ListItemText
                primary={`Your article recieved ${count} likes`}
                secondary={article.title}
            />
        </ListItemButton>
    )
}

function Comment({ notification: { count, articleId, article, unread } }) {
    return (
        <ListItemButton
            LinkComponent={Link}
            href={`/articles/${articleId}`}
            selected={unread}
        >
            <ListItemIcon>
                <ReviewsIcon />
            </ListItemIcon>
            <ListItemText
                primary={`Your article recieved ${count} comments`}
                secondary={article.title}
            />
        </ListItemButton>
    )
}

function Reply({ notification: { count, articleId, comment, unread } }) {
    return (
        <ListItemButton
            LinkComponent={Link}
            href={`/articles/${articleId}`}
            selected={unread}
        >
            <ListItemIcon>
                <ReplyIcon />
            </ListItemIcon>
            <ListItemText
                primary={`Your comment recieved ${count} replies`}
                secondary={comment.text}
            />
        </ListItemButton>
    )
}