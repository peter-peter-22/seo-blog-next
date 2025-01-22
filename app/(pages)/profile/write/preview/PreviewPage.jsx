import ArticlePreview from "@/app/ui/editor/ArticlePreview";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import { PageLoading } from "@/app/ui/layout/PageLoading";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import NoSsr from "@mui/material/NoSsr";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function PreviewPage({ updating }) {
    return (
        <NoSsr fallback={<PageLoading />}>
            <SingleColumn>
                <Card>
                    <CardContent>
                        <Typography color="text.secondary">
                            Previewing draft
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button href={updating ? `/profile/write/update/${updating}` : "/profile/write"}>
                            Back
                        </Button>
                    </CardActions>
                </Card  >
                <Toolbar />
                <ArticlePreview updating={updating} />
            </SingleColumn>
        </NoSsr>
    );
}
