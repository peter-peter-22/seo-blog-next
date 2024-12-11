import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PrimaryButton, SecondaryButton } from '../forms/components/FormButtons';
import Dialog from '@mui/material/Dialog';

export default function ConfirmDialog({ title, body, callback, confirmText, cancelText, onClose, ...props }) {
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
                <PrimaryButton
                    onClick={() => {
                        onClose()
                        callback()
                    }}
                    autoFocus
                >
                    {confirmText ?? "Confirm"}
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    )
}