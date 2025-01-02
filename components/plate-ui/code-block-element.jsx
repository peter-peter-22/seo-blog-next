import {
    setNodes
} from '@udecode/plate-common';
import { PlateElement, useEditorRef } from '@udecode/plate-common/react';
import { ReactEditor } from 'slate-react';
import React, { useState } from 'react';
import CodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import Box from '@mui/material/Box';
import "@/app/css/prism-vsc-dark-plus.css";
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

export function CodeBlockElement({
    className,
    children,
    ...props
}) {
    const editor = useEditorRef();

    function onChange(value) {
        const path = ReactEditor.findPath(editor, props.element); // Find the path of the node
        setNodes(editor, { ...props.element, value }, { at: path });
    }

    return (
        <PlateElement asChild className={className} {...props}  >
            <Box
                contentEditable={false}
                component="pre"
                className={`language-${"javascript"}`}
                sx={theme => ({
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: "transparent",
                    transition: theme.transitions.create(['all'], {
                        duration: theme.transitions.duration.shortest,
                    }),
                    borderRadius: 1,
                    my: 2,
                    "& textarea": {
                        outlineWidth: 0
                    },
                    "&:focus-within": {
                        borderColor: theme.palette.primary.light,
                    },
                })}>
                <CodeEditor
                    value={props.element.value}
                    onValueChange={onChange}
                    highlight={(code) => highlight(code, languages.js)}
                    style={{
                        fontFamily: 'var(--roboto)',
                        fontSize: 12,
                        backgroundColor: "revert-layer"
                    }}
                />
            </Box>
        </PlateElement>
    );
}