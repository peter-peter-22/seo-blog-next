"use client";

import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback, useTransition } from 'react';
import { SecondaryButton } from '../forms/components/FormButtons';

export default function ConfirmDialog({ title, body, callback, confirmText, cancelText, onClose, ...props }) {
    const [pending, startSubmit] = useTransition();
    const submit = useCallback(() => {
        startSubmit(
            async () => {
                await callback();
                onClose();
            }
        )
    }, [])
    return (
        <Dialog
            disableRestoreFocus
            maxWidth="sm"
            fullWidth
            onClose={onClose}
            {...props}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <SecondaryButton onClick={onClose}>{cancelText ?? "Cancel"}</SecondaryButton>
                <LoadingButton
                    loading={pending}
                    variant="contained"
                    onClick={submit}
                    autoFocus
                >
                    {confirmText ?? "Confirm"}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}