import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ArticleCard from "./ArticleCard";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function ArticleRow({ title, articles, filters }) {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        {title}
                    </Typography>
                    <Divider />
                    <Stack direction={"row"} sx={{ overflowX: "auto" }}>
                        {
                            articles.map((article, i) => (
                                <Box sx={{ minWidth:250,flexBasis:1 }} key={i} >
                                    <ArticleCard article={article} elevation={0} square={true} />
                                </Box>
                            ))
                        }
                    </Stack>
                    <Divider />
                </CardContent>
                <CardActions>
                    <Button
                        href={`/browse?${new URLSearchParams(filters).toString()}`}
                    >
                        See more
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}