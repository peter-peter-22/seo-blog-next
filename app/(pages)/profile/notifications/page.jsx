import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import Notification from "./Notification";
import prisma from "@/utils/db";
import { auth } from "@/auth";
import ClearCount from "./ClearCount";
import metadataGenerator from "@/app/lib/seo/metadataGenerator";

export default async function Page() {
    const session = await auth();

    const userId = session.user.id;

    const notifications = await prisma.notification.findMany({
        where: {
            userId
        },
        include: {
            article: {
                select: {
                    title: true
                }
            },
            sender: {
                select: {
                    name: true
                }
            }
        },
        orderBy: [
            { unread: "desc" },
            { createdAt: "desc" }
        ],
        take: 50
    })

    markNotificationsAsRead();

    return (
        <>
            <ClearCount />
            <Container maxWidth="sm" component={"main"}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                            Notifications
                        </Typography>
                        <Divider />
                    </CardContent>

                    {
                        notifications.length > 0 ? (
                            <List>
                                {notifications.map((notification, i, array) => (
                                    <Fragment key={i}>
                                        <Notification notification={notification} />
                                        {i < array.length - 1 && <Divider component={"li"} />}
                                    </Fragment>
                                ))}
                            </List>
                        ) : (
                            <CardContent>
                                <Typography color="textSecondary">
                                    No notifications yet
                                </Typography>
                            </CardContent>
                        )
                    }
                </Card>
            </Container>
        </>
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
        console.error(err);
    })
}

export const metadata = metadataGenerator({
    title: "Notifications"
})