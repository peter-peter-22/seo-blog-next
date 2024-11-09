import { Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArticleViewer from "../ui/editor/ArticleViewer";

export default function Home() {
    return (
        <>
            <Toolbar />
            <Typography variant="h4">
                Article viewer
            </Typography>
            <Typography>
                Images can be uploaded only via external url. To use your own images here, use a cloud service like google drive.
            </Typography>
            <ArticleViewer />
        </>
    );
}
