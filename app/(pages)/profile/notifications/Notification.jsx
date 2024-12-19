import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function Notification({ notification }) {
    return (
        <ListItem disablePadding>
            {notification.type == "like" ? (
                <Like notification={notification} />
            ) : notification.type == "comment" ? (
                <Comment notification={notification} />
            ) : (
                <Follow notification={notification} />
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

function Follow({ notification: { count, articleId, comment, unread } }) {
    return (
        <ListItemButton
            selected={unread}
        >
            <ListItemIcon>
                <PersonAddIcon />
            </ListItemIcon>
            <ListItemText
                primary={`You gained ${count} followers`}
            />
        </ListItemButton>
    )
}

//function Reply({ notification: { count, articleId, comment, unread } }) {
//    return (
//        <ListItemButton
//            LinkComponent={Link}
//            href={`/articles/${articleId}`}
//            selected={unread}
//        >
//            <ListItemIcon>
//                <ReplyIcon />
//            </ListItemIcon>
//            <ListItemText
//                primary={`Your comment recieved ${count} replies`}
//                secondary={comment.text}
//            />
//        </ListItemButton>
//    )
//}