import ArticleCard from '@/app/ui/components/articles/ArticleCard';
import BottomPagination from "@/app/ui/components/pagination/BottomPagination";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
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
            {count > 0 ? (
                <>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, browserMax: 3 }}>
                        {articles.map((article, i) => (
                            <Grid key={i} size={1}>
                                <ArticleCard article={article} />
                            </Grid>
                        ))}
                    </Grid>
                    <BottomPagination searchParams={searchParams} count={pages} page={page} />
                </>
            ) : (
                <Typography color="text.secondary" sx={{ textAlign: "center" }}>
                    No results
                </Typography>
            )}
        </>
    )
}