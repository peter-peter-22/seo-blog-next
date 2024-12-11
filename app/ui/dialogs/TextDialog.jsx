"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm, } from 'react-hook-form';
import { z } from 'zod';
import { SecondaryButton } from '../forms/components/FormButtons';
import FormTextField from '../forms/components/FormTextField';

export default function TextDialog({ title, body, callback, confirmText, cancelText, onClose, defaultValue, validation, textFieldProps, ...props }) {
    const Schema = useMemo(() => z.object({
        text: validation ?? z.string()
    }), []);
    const methods = useForm({
        resolver: zodResolver(Schema), // Apply the zodResolver
        defaultValues: { text: defaultValue }
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;
    const onSubmit = useCallback(async (data) => {
        const { text } = Schema.parse(data);
        await callback(text);
    }, []);
    return (
        <Dialog
            disableRestoreFocus
            maxWidth="sm"
            fullWidth
            onClose={onClose}
            component={"form"}
            onSubmit={(e) => {
                e.stopPropagation();
                handleSubmit(onSubmit)(e)
            }}
            {...props}
        >
            <FormProvider {...methods}>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    {body &&
                        <DialogContentText>
                            {body}
                        </DialogContentText>
                    }
                    <FormTextField
                        name="text"
                        autoFocus
                        fullWidth
                        {...textFieldProps}
                    />
                </DialogContent>
                <DialogActions>
                    <SecondaryButton onClick={onClose}>{cancelText ?? "Cancel"}</SecondaryButton>
                    <LoadingButton
                        loading={isSubmitting}
                        variant="contained"
                        type="submit"
                    >
                        {confirmText ?? "Confirm"}
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}