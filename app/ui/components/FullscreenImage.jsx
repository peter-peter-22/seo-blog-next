"use client"

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useCallback, useMemo, useState } from 'react';

export function useFullscreenImage({ src, alt }) {
    const [open, setOpen] = useState(false);
    const handleFullscreen = useCallback(() => { setOpen(true) },[]);
    const handleClose = useCallback(() => { setOpen(false) },[]);
    const FullscreenDialog = useMemo(() => (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={true}
            aria-labelledby="fullscreen-image"
            onClick={handleClose}
        >
            <DialogContent
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                    }}
                />
            </DialogContent>
        </Dialog>
    ), [open, alt, handleClose, src]);
    return { FullscreenDialog, handleFullscreen }
}