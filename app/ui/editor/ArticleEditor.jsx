'use client';

import React from "react";
import TextEditor from "./TextEditor";
import { useTransition } from 'react';
import { publishArticle } from "./actions/publishArticle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Link from 'next/link';

export default function ArticleEditor() {
  const initialValue = React.useMemo(getInitialValue, []);
  const contentRef = React.useRef(initialValue);
  const [isPending, startUpload] = useTransition();

  const onSubmit = (e) => {
    e.preventDefault();
    if (isPending)
      return;
    startUpload(async () => {
     await publishArticle(contentRef.current)
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <TextEditor
        slateProps={{
          initialValue,
        }}
        onChange={value => {
          contentRef.current = value;
          localStorage.setItem('content', JSON.stringify(value))
        }}
      />
      <Toolbar />
      <Typography>
        Publish the article to make it visible for the readers.
      </Typography>
      <Typography>
        The article remains editable after publishing.
      </Typography>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" LinkComponent={Link} href="/">Cancel</Button>
        <Button variant="contained" type="submit" disabled={isPending}>Publish</Button>
      </Stack>
    </form>
  );
}

const defaultValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

function getInitialValue() {
  try {
    return JSON.parse(localStorage.getItem('content')) || defaultValue;
  }
  catch {
    return defaultValue;
  }
}