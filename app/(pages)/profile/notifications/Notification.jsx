import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import { LinkNoPrefetch } from "@/app/lib/LinkNoPrefetch";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ArticleIcon from '@mui/icons-material/Article';
import React from "react";

export default function Notification({ notification }) {
    return (
        <ListItem disablePadding>
            {notification.type == "like" ? (
                <Like notification={notification} />
            ) : notification.type == "comment" ? (
                <Comment notification={notification} />
            ) : notification.type == "article" ? (
                <Article notification={notification} />
            ) : (
                <Follow notification={notification} />
            )}
        </ListItem>
    )
}

function Like({ notification: { count, startCount, articleId, article, unread } }) {
    return (
        <ListItemButton
            LinkComponent={LinkNoPrefetch}
            href={`/articles/${articleId}`}
            selected={unread}
        >
            <ListItemIcon>
                <ThumbUpIcon />
            </ListItemIcon>
            <ListItemText
                primary={`Your article recieved ${count - startCount} like(s)`}
                secondary={article?.title}
            />
        </ListItemButton>
    )
}

function Comment({ notification: { count, startCount, articleId, article, unread } }) {
    return (
        <ListItemButton
            LinkComponent={LinkNoPrefetch}
            href={`/articles/${articleId}`}
            selected={unread}
        >
            <ListItemIcon>
                <ReviewsIcon />
            </ListItemIcon>
            <ListItemText
                primary={`Your article recieved ${count - startCount} comment(s)`}
                secondary={article?.title}
            />
        </ListItemButton>
    )
}

function Article({ notification: { articleId, article, sender, unread } }) {
    return (
        <ListItemButton
            LinkComponent={LinkNoPrefetch}
            href={`/articles/${articleId}`}
            selected={unread}
        >
            <ListItemIcon>
                <ArticleIcon />
            </ListItemIcon>
            <ListItemText
                primary={`${sender?.name} published a new article`}
                secondary={article?.title}
            />
        </ListItemButton>
    )
}

function Follow({ notification: { count, startCount, unread } }) {
    return (
        <ListItemButton
            selected={unread}
            LinkComponent={LinkNoPrefetch}
            href={"/profile"}
        >
            <ListItemIcon>
                <PersonAddIcon />
            </ListItemIcon>
            <ListItemText
                primary={`You gained ${count - startCount} follower(s)`}
            />
        </ListItemButton>
    )
}

//function Reply({ notification: { count, articleId, comment, unread } }) {
//    return (
//        <ListItemButton
//            LinkComponent={LinkNoPrefetch}
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