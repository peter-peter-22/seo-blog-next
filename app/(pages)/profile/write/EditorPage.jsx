import Typography from "@mui/material/Typography";
import ArticleEditor from "@/app/ui/editor/ArticleEditor";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditorSkeleton from "@/app/ui/editor/EditorSkeleton";
import Toolbar from "@mui/material/Toolbar";
import NoSsr from "@mui/material/NoSsr";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import Divider from "@mui/material/Divider";

export default function EditorPage({ updating }) {
  return (
    <SingleColumn>
      <Card>
        <CardContent>
          <Typography variant="h4">
            Article editor
          </Typography>
          <Divider />
          <Typography color="textSecondary">
            The last state of the article is saved locally and it persists when the page is reloaded.
          </Typography>
        </CardContent>
      </Card  >
      <Toolbar />
      <NoSsr fallback={<EditorSkeleton />}>
        <ArticleEditor updating={updating} />
      </NoSsr>
    </SingleColumn>
  );
}
