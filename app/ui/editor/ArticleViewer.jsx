import getProfileLink from '@/app/ui/components/users/getProfileLink';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from "@mui/material/Chip";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HybridAvatar from '../profile/HybridAvatar';
import formatDate from '../utilities/formatDate';
import { defaultArticle } from './defaultArticle';
import TextViewer from "./TextViewer";
import TagContainer from "../components/articles/TagContainer";
import Stack from '@mui/material/Stack';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
                    <Stack direction="row" sx={{ flexWrap: "wrap",justifyContent:"space-between" }}>
                        <CardActions>
                            <IconButton>
                                <ThumbUpIcon />
                            </IconButton>
                            <Typography>999</Typography>
                            <Divider orientation='vertical' flexItem variant="middle" />
                            <Typography>999</Typography>
                            <IconButton>
                                <ThumbDownIcon />
                            </IconButton>
                        </CardActions>
                        <CardActions>
                            <IconButton>
                                <PersonAddIcon />
                            </IconButton>
                            <Typography>999</Typography>
                            <IconButton>
                                <PersonRemoveIcon />
                            </IconButton>
                        </CardActions>
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