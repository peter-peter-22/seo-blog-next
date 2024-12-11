import { commentAction } from '@/app/actions/commentActions';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { CommentSchemaClient } from '@/app/ui/forms/schemas/CommentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm, } from 'react-hook-form';

export default function CommentDialog({ replyingTo, articleId, onPublish, close }) {
    const { enqueueSnackbar } = useSnackbar();
    const methods = useForm({
        resolver: zodResolver(CommentSchemaClient), // Apply the zodResolver
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;
    const onSubmit = async (data) => {
        try {
            const created=await commentAction({
                articleId,
                replyingTo: replyingTo?.id,
                ...data
            });
            enqueueSnackbar("Comment published", { variant: "success" })
            onPublish(created);
            close();
        }
        catch (err) {
            enqueueSnackbar(err.toString(), { variant: "error" })
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    {replyingTo &&
                        <Typography color="text.secondary">
                            To {replyingTo.name}
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
                        Send
                    </LoadingButton>
                </DialogActions>
            </form>
        </FormProvider>
    )
}
