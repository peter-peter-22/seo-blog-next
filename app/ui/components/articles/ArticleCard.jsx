import Tags from '@/app/ui/components/articles/Tags';
import HybridAvatar from '@/app/ui/profile/HybridAvatar';
import formatDate from "@/app/ui/utilities/formatDate";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import ArticleProps from './ArticleProps';

export default function ArticleCard({ article, ...props }) {
    return (
        <Card {...props}>
            <CardActionArea href={`/articles/${article.id}`} sx={{ height: "100%" }}>
                <CardContent>

                    <Typography variant="h6">
                        {article.title}
                    </Typography>

                    <List>
                        <ListItem disablePadding>
                            <ListItemAvatar>
                                <HybridAvatar user={article.user} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={article.user.name}
                                secondary={formatDate(article.createdAt)}
                            />
                        </ListItem>
                    </List>

                    <Typography sx={{ overflowWrap: "break-word" }}>
                        {article.description}
                    </Typography>

                </CardContent>
                <CardActions>
                    <ArticleProps article={article} />
                </CardActions>
                <CardActions>
                    <Tags tags={article.tags} />
                </CardActions>
            </CardActionArea>
        </Card>
    )
}