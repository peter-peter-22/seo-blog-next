import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Editor from "./ui/editor/ArticleEditor";
import NoSSR from "./ui/NoSSR";

export default function Home() {
  return (
    <>
      <Toolbar />
      <Typography variant="h4">
        Article editor
      </Typography>
      <Typography>
        The last state of the article is saved locally and it persists when the page is reloaded.
      </Typography>
      <NoSSR>
        <Editor />
      </NoSSR>
    </>
  );
}
