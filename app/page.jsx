'use client';

import Typography from "@mui/material/Typography";
import Editor from "./ui/editor/ArticleEditor";
import React from "react";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import { Toolbar } from "@mui/material";
import NoSSR from "./ui/NoSSR";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Toolbar />
      <Typography variant="h4">
        Article editor
      </Typography>
      <Typography>
        The last state of the article is saved locally and it persists if the page is reloaded.
      </Typography>
      <Box sx={{ fontFamily: 'var(--font-roboto)' }}>
        <NoSSR>
          <Editor />
        </NoSSR>
      </Box>
    </Container>
  );
}
