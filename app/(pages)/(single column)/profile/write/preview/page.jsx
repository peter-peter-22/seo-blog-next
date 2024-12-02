import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditorSkeleton from "@/app/ui/editor/EditorSkeleton";
import Toolbar from "@mui/material/Toolbar";
import NoSsr from "@mui/material/NoSsr";
import ArticlePreview from "@/app/ui/editor/ArticlePreview";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function Home() {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography color="text.secondary">
                        Previewing draft
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={"/profile/write"}>
                        Back
                    </Button>
                </CardActions>
            </Card  >
            <Toolbar />
            <NoSsr fallback={<EditorSkeleton />}>
                <ArticlePreview />
            </NoSsr>
        </>
    );
}
