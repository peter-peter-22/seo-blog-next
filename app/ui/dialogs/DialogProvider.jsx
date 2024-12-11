"use client";

import Dialog from '@mui/material/Dialog';
import { createContext, useCallback, useContext, useState,memo } from 'react';

const DialogContext = createContext({ createDialog: null, close: null });

export default function DialogProvider({ children }) {
    const [data, setData] = useState();
    const createDialog = useCallback((content, dialogProps) => {
        setData({ content, dialogProps });
    }, [])
    const close = useCallback(() => {
        setData();
    }, []);
    return (
        <DialogContext.Provider value={{ createDialog, close }}>
            <Dialog
                open={!!data}
                onClose={close}
            >
                {data?.content}
            </Dialog>
            <MemoChildren>
                {children}
            </MemoChildren>
        </DialogContext.Provider>
    )
}

export function useDialog() {
    return useContext(DialogContext);
}

const MemoChildren = memo(({ children }) => children, () => true)