'use client';

import { publishArticle, updateArticle } from '@/app/actions/articleActions';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryLoadingButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { PublishArticleSchema } from "@/app/ui/forms/schemas/ArticleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useRef } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useDebouncedCallback } from 'use-debounce';
import FormTagsOnline from '../forms/components/FormTagsOnline';
import { PlateEditor } from '@/components/editor/plate-editor';
import { getDraft, getDraftName, useDraft } from '@/app/ui/editor/useDraft';

export default function ArticleEditor({ updating }) {
  const loadedDraft = getDraft({ updating });
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const articleRef = useRef(loadedDraft.content);

  const methods = useForm({
    resolver: zodResolver(PublishArticleSchema.omit({ article: true })), // Apply the zodResolver
    defaultValues: loadedDraft
  });
  const { handleSubmit, formState: { isSubmitting }, getValues, watch } = methods;

  const { save } = useDraft({ updating, disabled: isSubmitting });

  //save on any change in the form
  const onChangeAny = useCallback(() => {
    const [title, description, tags] = getValues(["title", "description", "tags"]);
    const values = {
      title,
      description,
      tags,
      content: articleRef.current
    }
    save(values);
  }, [getValues, save])

  //process the changes of the article
  const onChangeArticle = useCallback(({ value }) => {
    articleRef.current = value
    onChangeAny()
  }, [])

  //process the changes of the form
  useEffect(() => {
    const { unsubscribe } = watch(() => {
      onChangeAny();
    })
    return () => unsubscribe()
  }, [watch])

  const onSubmit = useCallback(async (data) => {
    try {
      //add the article to the submitted data
      data = { ...data, content: articleRef.current };

      //retrieve the id of the created or updated article
      const id = updating ?
        await updateArticle({ ...data, id: updating })
        :
        await publishArticle(data);

      enqueueSnackbar(updating ? "Article updated" : "Article published", { variant: "success" });
      localStorage.removeItem(getDraftName(updating));//delete the draft after publishing

      router.push(`/articles/${id}`)
    }
    catch (err) {
      enqueueSnackbar(err.toString(), { variant: "error" });
    }
  }, [enqueueSnackbar, router, updating]);

  return (
    <FormProvider {...methods}>
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
        <Toolbar />
        <PlateEditor
          value={articleRef.current}
          onChange={onChangeArticle}
        />
        <Toolbar />
        <Card>
          <CardContent>
            <FieldContainer>
              <Typography>
                Publish the article to make it visible for the readers.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                The article remains editable after publishing.
              </Typography>
            </FieldContainer>
          </CardContent>
          <CardActions>
            <SecondaryButton href={updating ? `/articles/${updating}` : "/profile"}>Cancel</SecondaryButton>
            <SecondaryButton href={updating ? `/profile/write/preview/update/${updating}` : "/profile/write/preview"}>Preview</SecondaryButton>
            <PrimaryLoadingButton loading={isSubmitting} type="submit">{updating ? "Update" : "Publish"}</PrimaryLoadingButton>
          </CardActions>
        </Card>
      </form >
    </FormProvider>
  );
}



//the draft saver must be stored in a separate component to prevent unnecessary re-renders on the whole form
function SaveDraft({ updating, disabled }) {
  const { watch } = useFormContext();

  const debounced = useDebouncedCallback(
    (values) => {
      localStorage.setItem(getDraftName(updating), JSON.stringify(values));
    },
    500
  );

  //cancel the delayed save when disabled
  useEffect(() => {
    if (!disabled)
      return;
    debounced.cancel();
  }, [disabled, debounced]);

  useEffect(() => {
    //if disabled, do not subscribe
    if (disabled)
      return;

    const { unsubscribe } = watch((allValues) => {
      debounced(allValues);
    })
    return () => unsubscribe()
  }, [watch, disabled, debounced])

}

