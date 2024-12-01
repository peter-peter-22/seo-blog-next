import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextViewer from "./TextViewer";
import formatDate from '../utilities/formatDate';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import HybridAvatar from '../profile/HybridAvatar';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

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
                                <HybridAvatar user={article.author} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Link href={`/authors/${article.author.id}`} color="inherit">{article.author.name}</Link>}
                                secondary={formatDate(article.createdAt)}
                            />
                        </ListItem>
                    </List>
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
                            initialValue: article.content
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