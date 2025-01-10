import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useCallback, useState } from 'react';

export function CodeBlockCopyButton({ value }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(value)
            .then(() => {
                setCopied(true);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }, [value]);
    const reset = useCallback(() => {
        setCopied(false);
    }, []);
    return (
        <Tooltip title={copied ? "Copied!" : "Copy"}>
            <IconButton
                color="primary"
                onClick={handleCopy}
                onBlur={reset}
            >
                <ContentPasteIcon />
            </IconButton>
        </Tooltip>
    )
}