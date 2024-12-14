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
import ArticleRow from "../components/articles/ArticleRow";
import TagContainer from "../components/articles/TagContainer";
import formatDate from "../utilities/formatDate";
import FollowProfile from "./FollowProfile";
import HybridAvatar from "./HybridAvatar";

export default function ProfilePage({ user, recentArticles, popularArticles, isMe }) {
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
                    {!isMe &&
                        <FollowProfile
                            user={user}
                        />
                    }
                    {user.AuthorTag && user.AuthorTag.length > 0 ? (
                        <>
                            <Typography color="text.secondary" variant="body2">{user.articleCount} articles</Typography>
                            <TagContainer sx={{ mt: 1 }}>
                                {user.AuthorTag.map((tag, i) => (
                                    <Chip
                                        label={`${tag.name} - ${tag.count}`}
                                        clickable
                                        component={Link}
                                        size="small"
                                        href={`/browse?${new URLSearchParams({ tags: tag.name, author: user.id }).toString()}`}
                                        key={i}
                                    />
                                ))}
                            </TagContainer>
                        </>
                    ) : (
                        <Typography color="text.secondary">No articles yet</Typography>
                    )}
                </CardContent>
                {isMe &&
                    <CardActions>
                        <>
                            <Button href="/profile/edit">
                                Edit
                            </Button>
                            <Button href="/profile/changePassword">
                                Change password
                            </Button>
                        </>
                    </CardActions>
                }
            </Card>
            <Toolbar />
            <ArticleRow title="Recent articles" articles={recentArticles} filters={{ author: user.id }} />
            <Toolbar />
            <ArticleRow title="Top articles" articles={popularArticles} filters={{ author: user.id, sort: "likeCount" }} />
        </>
    )
}