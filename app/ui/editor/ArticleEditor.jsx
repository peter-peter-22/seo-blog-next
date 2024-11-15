'use client';

import React from "react";
import TextEditor from "./TextEditor";
import { useTransition } from 'react';
import { publishArticle } from "./actions/publishArticle";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CancelButton, SubmitButton } from '@/app/ui/forms/components/FormButtons';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import FormTextField from '@/app/ui/forms/components/FormTextField';

export default function ArticleEditor() {
  const loadedDraft = React.useMemo(loadDraft, []);
  const contentRef = React.useRef(loadedDraft);
  const [isPending, startUpload] = useTransition();

  const changeAny = React.useCallback((name, value) => {
    contentRef.current[name] = value;
    localStorage.setItem('draft', JSON.stringify(contentRef.current));
  }, []);

  const handleTextField = React.useCallback((name) => ({
    onChange: (e) => {
      changeAny(name, e.target.value);
    },
    defaultValue: contentRef.current[name]
  }), [])

  const onSubmit = (e) => {
    e.preventDefault();
    if (isPending)
      return;
    startUpload(async () => {
      const res = await publishArticle(contentRef.current);
      if (res?.errors)
        alert(res.message);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardContent>
          <FieldContainer>
            <TextField
              id="title"
              label="Title"
              fullWidth
              sx={{ maxWidth: "30em" }}
              {...handleTextField("title")}
            />
            <TextField
              id="description"
              label="Description"
              multiline
              fullWidth
              {...handleTextField("desc")}
            />
          </FieldContainer>
        </CardContent>
      </Card>
      <TextEditor
        slateProps={{
          initialValue: contentRef.current.article,
        }}
        onChange={value => changeAny("article", value)}
      />
      <Toolbar />
      <Card>
        <CardContent>
          <Typography>
            Publish the article to make it visible for the readers.
          </Typography>
          <Typography>
            The article remains editable after publishing.
          </Typography>
          <Stack spacing={2} direction="row">
            <CancelButton LinkComponent={Link} href="/">Cancel</CancelButton>
            <SubmitButton disabled={isPending}>Publish</SubmitButton>
          </Stack>
        </CardContent>
      </Card>
    </form >
  );
}

const defaultValue = {
  article: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]
};

function loadDraft() {
  try {
    return JSON.parse(localStorage.getItem('draft')) || defaultValue;
  }
  catch {
    return defaultValue;
  }
}