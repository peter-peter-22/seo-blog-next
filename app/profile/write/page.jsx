import Typography from "@mui/material/Typography";
import ArticleEditor from "../../ui/editor/ArticleEditor";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditorSkeleton from "../../ui/editor/EditorSkeleton";
import Toolbar from "@mui/material/Toolbar";
import NoSsr from "@mui/material/NoSsr";

export default function Home() {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4">
            Article editor
          </Typography>
          <Typography>
            The last state of the article is saved locally and it persists when the page is reloaded.
          </Typography>
        </CardContent>
      </Card  >
      <Toolbar />
      <NoSsr fallback={<EditorSkeleton />}>
        <ArticleEditor />
      </NoSsr>
    </>
  );
}
