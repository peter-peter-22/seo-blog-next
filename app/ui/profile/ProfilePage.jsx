import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import formatDate from "../utilities/formatDate";
import Box from "@mui/material/Box";
import StringAvatar from "../root/header/user/StringAvatar";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ProfilePage({ user, isMe }) {
    return (
        <>
            <Box sx={{
                display: { xs: "block", sm: "none" }
            }}>
                <Box boxShadow={2} sx={{ borderRadius: "100%", width: "fit-content", mx: "auto" }}>
                    <StringAvatar
                        name={user.username}
                        sx={{
                            width: 100,
                            height: 100,
                            fontSize: 50,
                            border: 5,
                        }}
                    />
                </Box>
                <Toolbar />
            </Box>
            <Card>
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5">
                                {user.username}
                            </Typography>
                            <Typography color="text.secondary">
                                Joined at {formatDate(user.created)}
                            </Typography>
                            <Divider />
                            <Typography >
                                description
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: { xs: "none", sm: "block" }
                        }}>
                            <StringAvatar
                                name={user.username}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    fontSize: 50,
                                }}
                            />
                        </Box>
                    </Stack>
                    {isMe &&
                        <Button>
                            Edit
                        </Button>
                    }
                </CardContent>
            </Card>
            <Toolbar />
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        Recent articles
                    </Typography>
                    <Divider />

                </CardContent>
            </Card>
            <Toolbar />
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        Top articles
                    </Typography>
                    <Divider />

                </CardContent>
            </Card>
        </>
    )
}