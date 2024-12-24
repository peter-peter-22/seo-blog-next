import CodeIcon from '@mui/icons-material/Code';
import Chip from '@mui/material/Chip';
import { useCallback, useState } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Box from '@mui/material/Box';

const CodeHighlighter = ({ code, language = "text" }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopied(true);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }, [code]);
    const reset = useCallback(() => {
        setCopied(false);
    }, []);
    return (
        <>
            <Chip icon={<CodeIcon />} label={language} />
            <Box sx={{ position: "relative" }}>
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus} // Dark theme
                    showLineNumbers={true} // Display line numbers
                    wrapLines={true} // Wrap long lines
                    customStyle={{
                        borderRadius: 5
                    }}
                >
                    {code}
                </SyntaxHighlighter>
                <Tooltip title={copied ? "Copied!" : "Copy"}>
                    <IconButton
                        sx={{ position: "absolute", right: 2, top: 2 }}
                        color="primary"
                        onClick={handleCopy}
                        onBlur={reset}
                    >
                        <ContentPasteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    );
};
export default CodeHighlighter;