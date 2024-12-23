import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Skeleton from '@mui/material/Skeleton';
import Typography from "@mui/material/Typography";

export default function ArticleRowSkeleton({ title, seeMore }) {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        {title}
                    </Typography>
                    <Divider />
                    <Skeleton variant="rectangular" width={"100%"} height={400} />
                    <Divider />
                </CardContent>
                {seeMore &&
                    <CardActions>
                        <Button disabled={true}>
                            See more
                        </Button>
                    </CardActions>
                }
            </Card>
        </>
    )
}