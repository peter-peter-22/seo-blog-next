import getProfileLink from '@/app/ui/components/users/getProfileLink';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from "@mui/material/Chip";
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TagContainer from "../components/articles/TagContainer";
import HybridAvatar from '../profile/HybridAvatar';
import formatDate from '../utilities/formatDate';
import { defaultArticle } from './defaultArticle';
import TextViewer from "./TextViewer";
import ArticleLikes from '../profile/reactions/ArticleLikes';
import FollowButtons from '../profile/reactions/FollowButtons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListItemIcon from '@mui/material/ListItemIcon';
import formatNumber from '../utilities/formatNumber';

export default function ArticleViewer({ article, preview }) {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h4">
                        {article.title}
                    </Typography>
                    <Divider />
                    <Typography >
                        {article.description}
                    </Typography>

                    <List>
                        <ListItem disablePadding>
                            <ListItemAvatar>
                                <HybridAvatar user={article.user} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Link href={getProfileLink(article.user)} color="inherit">{article.user.name}</Link>}
                                secondary={formatDate(article.createdAt)}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <VisibilityIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography color="text.secondary">
                                    {formatNumber(article.viewCount)}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>


                    {article.tags && article.tags.length > 0 ? (
                        <TagContainer>
                            {article.tags.map((tag, i) => (
                                <Chip
                                    key={i}
                                    label={tag}
                                    size="small"
                                    clickable
                                    component={Link}
                                    href={`/browse?${new URLSearchParams({ tags: tag }).toString()}`}
                                />
                            ))}
                        </TagContainer>
                    ) : (
                        <Typography color="text.secondary">Untagged</Typography>
                    )
                    }

                </CardContent>
                {!preview &&
                    <Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
                        <ArticleLikes article={article} />
                        <FollowButtons
                            userId={article.user.id}
                            isFollowed={!!article.user.Followers?.[0]}
                            followerCount={article.user.followerCount}
                        />
                    </Stack>
                }
            </Card>
            <Toolbar />
            <Card>
                <CardContent>
                    <TextViewer
                        slateProps={{
                            initialValue: article.content ?? defaultArticle
                        }}
                        editorProps={{
                            readOnly: true
                        }}
                    />
                </CardContent>
            </Card>
        </>
    );
}