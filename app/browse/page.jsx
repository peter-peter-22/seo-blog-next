import prisma from "@/utils/db";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HybridAvatar from '@/app/ui/profile/HybridAvatar';
import formatDate from "@/app/ui/utilities/formatDate";

export default async function Page() {
    const allArticles = await prisma.article.findMany({
        include:
        {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    });
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h4">
                        Browse articles
                    </Typography>
                </CardContent>
            </Card>
            <Toolbar />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {allArticles.map((article, i) => (
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
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
