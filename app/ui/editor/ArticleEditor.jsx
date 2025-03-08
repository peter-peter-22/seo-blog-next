'use client';

import { publishArticle, updateArticle } from '@/app/actions/articleActions';
import { useGetDraft, getDraftName, useDraft } from '@/app/ui/editor/useDraft';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryLoadingButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { PublishArticleSchema } from "@/app/ui/forms/schemas/ArticleSchema";
import { PlateEditor } from '@/components/editor/plate-editor';
import { zodResolver } from "@hookform/resolvers/zod";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormTagsOnline from '../forms/components/FormTagsOnline';
import { useSession } from 'next-auth/react';
import getProfileLink from '../components/users/getProfileLink';

export default function ArticleEditor({ updating }) {
  const loadedDraft = useGetDraft({ updating });
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const articleRef = useRef(loadedDraft.content);
  const session = useSession();
  const user = session?.data?.user;
  const profileUrl = getProfileLink(user)

  const methods = useForm({
    resolver: zodResolver(PublishArticleSchema.omit({ content: true })), // Apply the zodResolver
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
  }, [onChangeAny])

  //process the changes of the form
  useEffect(() => {
    const { unsubscribe } = watch(() => {
      onChangeAny();
    })
    return () => unsubscribe()
  }, [watch,onChangeAny])

  const onSubmit = useCallback(async (data) => {
      //add the article to the submitted data
      data = { ...data, content: articleRef.current };

      //retrieve the id of the created or updated article
      const {error,id} = updating ?
        await updateArticle({ ...data, id: updating })
        :
        await publishArticle(data);

    if (error)
      return enqueueSnackbar(error.toString(), { variant: "error" });

    enqueueSnackbar(updating ? "Article updated" : "Article published", { variant: "success" });
    localStorage.removeItem(getDraftName(updating));//delete the draft after publishing

    router.push(`/articles/${id}`)
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
            <SecondaryButton href={updating ? `/articles/${updating}` : profileUrl}>Cancel</SecondaryButton>
            <SecondaryButton href={updating ? `/profile/write/preview/update/${updating}` : "/profile/write/preview"}>Preview</SecondaryButton>
            <PrimaryLoadingButton loading={isSubmitting} type="submit">{updating ? "Update" : "Publish"}</PrimaryLoadingButton>
          </CardActions>
        </Card>
      </form >
    </FormProvider>
  );
}