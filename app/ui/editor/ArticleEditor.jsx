'use client';

import { publishOrUpdateArticle } from '@/app/actions/articleActions';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { PublishArticleSchema, UpdateArticleSchema } from "@/app/ui/forms/schemas/ArticleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSnackbar } from 'notistack';
import React, { useCallback } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useDebouncedCallback } from 'use-debounce';
import FormTagsOnline from '../forms/components/FormTagsOnline';
import { defaultArticle } from './defaultArticle';
import RichTextEditorForm from "./RichTextEditorForm";

export default function ArticleEditor({ updating }) {
  const loadedDraft = React.useMemo(() => loadDraft(updating), []);
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: zodResolver(updating ? UpdateArticleSchema : PublishArticleSchema), // Apply the zodResolver
    defaultValues: loadedDraft
  });
  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = useCallback(async (data) => {
    const err = await publishOrUpdateArticle(data,updating);
    if (err)
      enqueueSnackbar(err, { variant: "error" });
    else {
      enqueueSnackbar(updating ? "Article updated" : "Article published", { variant: "success" });
      localStorage.removeItem(getDraftName(updating));//delete the draft after publishing
    }
  });

  return (
    <FormProvider {...methods}>
      <SaveDraft updating={updating} />
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
                minRows={2}
                fullWidth
              />
              <FormTagsOnline name="tags" label="Tags" fullWidth />
            </FieldContainer>
          </CardContent>
        </Card>
        <RichTextEditorForm
          name="content"
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
            <SecondaryButton href={updating ? `/articles/${loadedDraft.id}` : "/profile"}>Cancel</SecondaryButton>
            <SecondaryButton href={updating ? "/profile/write/preview/update" : "/profile/write/preview"}>Preview</SecondaryButton>
            <PrimaryButton disabled={isSubmitting} type="submit">{updating ? "Update" : "Publish"}</PrimaryButton>
          </CardActions>
        </Card>
      </form >
    </FormProvider>
  );
}

export function loadDraft(updating) {
  try {
    return JSON.parse(localStorage.getItem(getDraftName(updating))) || defaultArticle;
  }
  catch {
    return defaultArticle;
  }
}

//the draft saver must be stored in a separate component to prevent unnecessary re-renders on the whole form
function SaveDraft({ updating }) {
  const { watch } = useFormContext();
  const allValues = watch();
  const debounced = useDebouncedCallback(
    (values) => {
      localStorage.setItem(getDraftName(updating), JSON.stringify(values));
    },
    500
  );
  debounced(allValues);
}

export function getDraftName(updating) {
  return updating ? 'updateDraft' : 'draft';
}