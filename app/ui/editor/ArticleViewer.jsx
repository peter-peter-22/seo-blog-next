import getProfileLink from '@/app/ui/components/users/getProfileLink';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from "@mui/material/Chip";
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import TagContainer from "../components/articles/TagContainer";
import HybridAvatar from '../profile/HybridAvatar';
import ArticleLikes from '../../(pages)/articles/[id]/ArticleLikes';
import FollowButtons from '../../(pages)/articles/[id]/FollowButtons';
import formatDate from '../utilities/formatDate';
import formatNumber from '../utilities/formatNumber';
import { defaultArticle } from './defaultArticle';
import TextViewer from "./TextViewer";
import ArticleComments from '@/app/(pages)/articles/[id]/ArticleComments';

export default function ArticleViewer({ article, preview, isMe }) {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">
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
                                <Tooltip title="View count">
                                    <VisibilityIcon />
                                </Tooltip>
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
                                    href={`/browse?${new URLSearchParams({ tag: tag }).toString()}`}
                                />
                            ))}
                        </TagContainer>
                    ) : (
                        <Typography color="text.secondary">Untagged</Typography>
                    )
                    }

                </CardContent>
                {!preview && !isMe &&
                    <Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
                        <ArticleLikes article={article} />
                        <FollowButtons
                            user={article.user}
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
            {!preview &&
                <>
                    <Toolbar />
                    <ArticleComments article={article} />
                </>
            }
        </>
    );
}