import prisma from "@/utils/db";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import Toolbar from "@mui/material/Toolbar";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";

export default async function Page() {
    const allArticles = await prisma.article.findMany();
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

                                    <ListItem disablePadding>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText secondary="author" />
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemIcon>
                                            <CalendarMonthIcon />
                                        </ListItemIcon>
                                        <ListItemText secondary="2020202020" />
                                    </ListItem>

                                    <Typography>
                                        {article.desc}
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
