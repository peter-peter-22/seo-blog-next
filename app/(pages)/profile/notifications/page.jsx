import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import Notification from "./Notification";

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
        <Container maxWidth="sm" component={"main"}>
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
        </Container>
    )
}