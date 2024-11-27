'use client';

import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { PublishArticleSchema } from "@/app/ui/forms/schemas/ArticleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import RichTextEditorForm from "./RichTextEditorForm";
import { publishArticle } from '@/app/actions/articleActions';
import { useSnackbar } from 'notistack';
import CardActions from '@mui/material/CardActions';
import { useDebouncedCallback } from 'use-debounce';

export default function ArticleEditor() {
  const loadedDraft = React.useMemo(loadDraft, []);
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: zodResolver(PublishArticleSchema), // Apply the zodResolver
    defaultValues: loadedDraft
  });
  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = useCallback(async (data) => {
    const err = await publishArticle(data);
    if (err)
      enqueueSnackbar(err, { variant: "error" });
    else
      enqueueSnackbar("Article published", { variant: "success" });
  });

  return (
    <FormProvider {...methods}>
      <SaveDraft />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <FieldContainer>
              <FormTextField
                name="title"
                label="Title"
                multiline
                fullWidth
              />
              <FormTextField
                name="description"
                label="Description"
                multiline
                fullWidth
              />
            </FieldContainer>
          </CardContent>
        </Card>
        <RichTextEditorForm
          name="article"
        />
        <Toolbar />
        <Card>
          <CardContent>
            <FieldContainer>
              <Typography>
                Publish the article to make it visible for the readers.
              </Typography>
              <Typography>
                The article remains editable after publishing.
              </Typography>
            </FieldContainer>
          </CardContent>
          <CardActions>
            <SecondaryButton href="/profile">Cancel</SecondaryButton>
            <PrimaryButton disabled={isSubmitting} type="submit">Publish</PrimaryButton>
          </CardActions>
        </Card>
      </form >
    </FormProvider>
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

//the draft saver must be stored in a separate component to prevent unnecessary re-renders on the whole form
function SaveDraft() {
  const { watch } = useFormContext();
  const allValues = watch();
  const debounced = useDebouncedCallback(
    (values) => {
      localStorage.setItem('draft', JSON.stringify(values));
    },
    500
  );
  debounced(allValues);
}