import getProfileLink from '@/app/ui/components/users/getProfileLink';
import { PlateViewer } from '@/components/editor/plate-viewer';
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
import Toolbar from "@mui/material/Toolbar";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import FollowButtons from '../../(pages)/articles/[id]/FollowButtons';
import TagContainer from "../components/articles/TagContainer";
import HybridAvatar from '../profile/HybridAvatar';
import formatDate from '../utilities/formatDate';
import formatNumber from '../utilities/formatNumber';

export default function ArticleViewer({ article, children }) {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h1">
                        {article.title}
                    </Typography>
                    <Divider />
                    <Typography component={"h2"}>
                        {article.description}
                    </Typography>

                    {children}

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
            </Card>
            <Toolbar />
            <PlateViewer
                value={article.content}
            />
        </>
    );
}

export function ArticleDynamicSection({ article, isMine, isPreview }) {
    return (
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

            {!isPreview &&
                <>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <Tooltip title="View count">
                                <VisibilityIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography color="text.secondary">
                                    {formatNumber(article.viewCount)}
                                </Typography>
                            }
                        />
                    </ListItem>
                    
                    {!isMine &&
                        < FollowButtons
                            user={article.user}
                        />
                    }
                </>
            }
        </List>
    )
}