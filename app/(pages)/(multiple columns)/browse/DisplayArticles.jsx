import Tags from '@/app/ui/components/articles/Tags';
import BottomPagination from "@/app/ui/components/pagination/BottomPagination";
import HybridAvatar from '@/app/ui/profile/HybridAvatar';
import formatDate from "@/app/ui/utilities/formatDate";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function DisplayArticles({ page, pages, articles, count, searchParams }) {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        Browsing articles
                    </Typography>
                    <Divider />
                    <Typography color="text.secondary">
                        {count} articles found
                    </Typography>
                </CardContent>
            </Card>
            <Toolbar />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, browserMax: 3 }}>
                {articles.map((article, i) => (
                    <Grid key={i} size={1}>
                        <Card >
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
                                    <Tags tags={article.tags} />
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <BottomPagination searchParams={searchParams} count={pages} page={page} />
        </>
    )
}