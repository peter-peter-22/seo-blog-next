import { ProfileDynamicDataProvider } from "@/app/(pages)/authors/[id]/ProfileDynamicDataProvider";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import formatDate from "../utilities/formatDate";
import { RecentArticles, TopArticles } from "./Articles";
import HybridAvatar from "./HybridAvatar";
import { UserStatistics } from "./UserStatistics";
import { UserTags } from "./UserTags";
import { ProfileActions } from "./profile options/ProfileActions";

export default function ProfilePage({ user }) {
    return (
        <ProfileDynamicDataProvider user={user}>
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
                            <Typography variant="h5" component={"h1"}>
                                {user.name}
                            </Typography>
                            <Typography color="text.secondary">
                                Joined at {formatDate(user.createdAt)}
                            </Typography>
                            <Divider />
                            <Typography >
                                {user.description}
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

                    <UserStatistics />
                    <UserTags />

                </CardContent>

                <ProfileActions />
            </Card>
            <Toolbar />
            <RecentArticles user={user} />
            <Toolbar />
            <TopArticles user={user} />
        </ProfileDynamicDataProvider>
    )
}