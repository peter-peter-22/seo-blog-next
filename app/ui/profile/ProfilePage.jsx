import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import formatDate from "../utilities/formatDate";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HybridAvatar from "./HybridAvatar";
import CardActions from '@mui/material/CardActions';

export default function ProfilePage({ user, isMe }) {
    return (
        <>
            <Box sx={{
                display: { xs: "block", sm: "none" }
            }}>
                <Box boxShadow={2} sx={{ borderRadius: "100%", width: "fit-content", mx: "auto" }}>
                    <HybridAvatar
                        user={user}
                        sx={{
                            width: 100,
                            height: 100,
                            fontSize: 50,
                            border: 5,
                            borderColor: "background.default"
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
                                {user.name}
                            </Typography>
                            <Typography color="text.secondary">
                                Joined at {formatDate(user.createdAt)}
                            </Typography>
                            <Divider />
                            <Typography >
                                description
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: { xs: "none", sm: "block" }
                        }}>
                            <HybridAvatar
                                user={user}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    fontSize: 50,
                                }}
                            />
                        </Box>
                    </Stack>
                </CardContent>
                {isMe &&
                    <CardActions>
                        <Button>
                            Edit
                        </Button>
                    </CardActions>
                }
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