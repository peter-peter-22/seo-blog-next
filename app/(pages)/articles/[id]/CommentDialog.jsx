import { commentAction, updateCommentAction } from '@/app/actions/commentActions';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { CommentSchemaClient } from '@/app/ui/forms/schemas/CommentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { FormProvider, useForm, } from 'react-hook-form';

export default function CommentDialog({ replyingTo, articleId, onPublish, onUpdate, close, updating }) {
    const { enqueueSnackbar } = useSnackbar();
    const methods = useForm({
        resolver: zodResolver(CommentSchemaClient), // Apply the zodResolver
        defaultValues: { text: updating?.text }
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;
    const onSubmit = useCallback(async (data) => {
        const { created, error } = updating ?
            await updateCommentAction({
                id: updating.id,
                ...data
            })
            :
            await commentAction({
                articleId,
                replyingTo: replyingTo?.id,
                ...data
            });

        if (error)
            return enqueueSnackbar(error, { variant: "error" })

        enqueueSnackbar(updating ? "Comment updated" : "Comment published", { variant: "success" })
        if (updating)
            onUpdate(created)
        else
            onPublish(created);
        close();
    }, [articleId, close, enqueueSnackbar, onPublish, onUpdate, replyingTo, updating])

    //if updading, choose the replied user of the updated comment
    //if not, then use the replied user of the new comment
    const replyingToAny = updating ? updating.replyingTo : replyingTo;

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    {replyingToAny &&
                        <Typography color="text.secondary">
                            To {replyingToAny.name}
                        </Typography>
                    }
                    <FormTextField
                        name="text"
                        label={replyingTo ? "Reply" : "Comment"}
                        disabled={isSubmitting}
                        autoFocus
                        autoComplete="off"
                        multiline
                        fullWidth
                        minRows={2}
                        placeholder="What do you think?"
                    />
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={isSubmitting}
                        loadingPosition="end"
                        endIcon={<SendIcon />}
                        variant="filled"
                        type="submit"
                    >
                        {updating ? "Update" : "Send"}
                    </LoadingButton>
                </DialogActions>
            </form>
        </FormProvider>
    )
}
