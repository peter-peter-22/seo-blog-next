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
import { Link } from '@mui/material';

export default function ArticleViewer({ article }) {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h4">
                        {article.title}
                    </Typography>
                    <Typography >
                        {article.desc}
                    </Typography>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText secondary={<Link href={`/authors/${article.author.id}`} color="inherit">{article.author.username}</Link>} />
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemIcon>
                            <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText secondary={formatDate(article.createdAt)} />
                    </ListItem>
                </CardContent>
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