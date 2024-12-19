import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import Notification from "./Notification";
import prisma from "@/utils/db";
import { auth } from "@/auth";

export default async function Page() {
    const session = await auth();

    const userId = session.user.id;

    const notifications = await prisma.notification.findMany({
        where: {
            userId
        },
        include: {
            article: true
        },
        orderBy: [
            { unread: "desc" },
            { createdAt: "desc" }
        ],
        take:50
    })

    markNotificationsAsRead();

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

function markNotificationsAsRead(userId) {
    prisma.notification.updateMany({
        data: {
            unread: false
        },
        where: {
            userId,
            unread: true
        }
    }).catch(err => {
        console.log(err);
    })
}