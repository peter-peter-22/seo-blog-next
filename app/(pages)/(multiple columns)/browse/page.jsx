import HybridAvatar from '@/app/ui/profile/HybridAvatar';
import formatDate from "@/app/ui/utilities/formatDate";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import getFilteredArticles from './getFilteredArticles';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Filters from "@/app/(pages)/(multiple columns)/browse/Filters";
import { MultipleColumns } from '@/app/ui/layout/Layouts';
import People from './People';

export default async function Page({ searchParams }) {
    const articles = await getFilteredArticles(searchParams);
    const count = 999;
    return (
        <MultipleColumns
            Left={<Filters defaultValues={searchParams} />}
            Main={
                <>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">
                                Browse articles
                            </Typography>
                            <Divider />
                            <Typography color="text.secondary">
                                {count} articles found
                            </Typography>
                        </CardContent>
                    </Card>
                    <Toolbar />
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {articles.map((article, i) => (
                            <Grid key={i} size={{ xs: 2, sm: 4, md: 4 }}>
                                <Card sx={{ height: "100%" }}>
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
                                            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                                                {article.tags.map((tag, i) => <Chip key={i} label={tag} size="small" />)}
                                            </Stack>
                                        </CardActions>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            }
            Right={
                <People />
            }
        />
    );
}
