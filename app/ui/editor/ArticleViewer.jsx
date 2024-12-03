import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
import TextViewer from "./TextViewer";
import Tags from '../components/articles/Tags';
import { defaultArticle } from './defaultArticle';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function ArticleViewer({ article }) {
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
                                primary={<Link href={`/authors/${article.user.id}`} color="inherit">{article.user.name}</Link>}
                                secondary={formatDate(article.createdAt)}
                            />
                        </ListItem>
                    </List>

                    <Tags tags={article.tags ?? []} />
                </CardContent>
                <CardActions>
                    <IconButton>
                        <ThumbUpIcon />
                    </IconButton>
                    <IconButton>
                        <ThumbDownIcon />
                    </IconButton>
                    <IconButton>
                        <PersonAddIcon />
                    </IconButton>
                    <IconButton>
                        <PersonRemoveIcon />
                    </IconButton>
                </CardActions>
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