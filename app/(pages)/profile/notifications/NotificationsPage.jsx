import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import ClearCount from "./ClearCount";
import Notification from "./Notification";

export default function NotificationsPage({notifications}) {
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