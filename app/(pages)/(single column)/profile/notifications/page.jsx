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
import { Fragment } from "react";
import Notification from "./Notification";
import List from "@mui/material/List";

export default function Page() {
    const notifications = [
        {
            id: "123",
            type: "like",
            articleId: "43433",
            article: { title: 'title' },
            count: 12,
            unread: true
        },
        {
            id: "12334",
            type: "comment",
            articleId: "2131",
            article: { title: 'title' },
            count: 2,
            unread: false
        },
        {
            id: "123134",
            type: "reply",
            commentId: "21311",
            comment: { text: 'text' },
            count: 2,
            unread: false
        }
    ]
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Notifications
                </Typography>
                <Divider />
            </CardContent>
            <List>
                {notifications.map((notification, i, array) => (
                    <Fragment key={i}>
                        <Notification notification={notification} />
                        {i < array.length - 1 && <Divider component={"li"} />}
                    </Fragment>
                ))}
            </List>
        </Card>
    )
}