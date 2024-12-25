"use client";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback, useTransition } from 'react';
import { PrimaryLoadingButton, SecondaryButton } from '../forms/components/FormButtons';

export default function ConfirmDialog({ title, body, callback, confirmText, cancelText, onClose, ...props }) {
    const [pending, startSubmit] = useTransition();
    const submit = useCallback(() => {
        startSubmit(callback)
    }, [callback])
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
            {body &&
                <DialogContent>
                    <DialogContentText>
                        {body}
                    </DialogContentText>
                </DialogContent>
            }
            <DialogActions>
                <SecondaryButton onClick={onClose}>{cancelText ?? "Cancel"}</SecondaryButton>
                <PrimaryLoadingButton
                    loading={pending}
                    onClick={submit}
                    autoFocus
                >
                    {confirmText ?? "Confirm"}
                </PrimaryLoadingButton>
            </DialogActions>
        </Dialog>
    )
}