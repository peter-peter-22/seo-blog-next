import prisma from "@/utils/db";
import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

export default async function Home() {
    const allArticles = await prisma.article.findMany();
    return (
        <>
            <Toolbar />
            <Typography variant="h4">
                articles
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {allArticles.map((article, i) => (
                    <Grid key={i} size={{ xs: 2, sm: 4, md: 4 }}>
                        <Paper>
                            <Typography variant="h6">
                                {article.title}
                            </Typography>
                            <Typography>
                                {article.desc}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
