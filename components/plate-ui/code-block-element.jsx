"use client"

import "@/app/css/prism-vsc-dark-plus.css";
import Box from '@mui/material/Box';
import { useCodeBlockElementState } from '@udecode/plate-code-block/react';
import { PlateElement, setNode, useEditorRef } from '@udecode/plate-common/react';
import { highlight } from "prismjs";
import { useState } from "react";
import CodeEditor from 'react-simple-code-editor';
import { CodeBlockCombobox, Prism } from "./code-block-combo-box";
import { useReadOnly } from "slate-react";
import { CodeBlockCopyButton } from "./code-block-copy-button";

export function CodeBlockElement({
    className,
    children,
    ...props
}) {
    const editor = useEditorRef();
    const { element } = props;
    const [value, setValue] = useState(element.value);
    const state = useCodeBlockElementState({ element });
    const readOnly = useReadOnly();

    function onChange(value) {
        setValue(value);
        setNode(editor, element, { value });
    }

    return (
        <PlateElement
            className={className}
            {...props}
        >
            <Box
                sx={{ position: "relative" }}
                contentEditable={false}
            >
                <Box
                    component="pre"
                    className={state.className || "language-text"}
                    sx={theme => ({
                        borderWidth: 2,
                        borderStyle: "solid",
                        borderColor: "transparent",
                        transition: theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.shortest,
                        }),
                        borderRadius: 1,
                        my: 2,
                        pt: "25px !important",
                        "& textarea": {
                            outlineWidth: 0
                        },
                        "&:focus-within": {
                            borderColor: theme.palette.primary.main,
                        },
                        maxHeight: 400,
                        scrollbarWidth: "none"
                    })}>
                    <CodeEditor
                        value={value}
                        onValueChange={onChange}
                        highlight={(code) => highlight(code, Prism.languages[element.lang ?? "text"])}
                        readOnly={readOnly}
                    />
                </Box>
                <Box sx={{
                    position: "absolute",
                    right: 5,
                    top: 3,
                    color: "white"//force white color because of the back balckground
                }}>
                    {readOnly ?
                        <CodeBlockCopyButton value={value} />
                        :
                        <CodeBlockCombobox />
                    }
                </Box>
                <div style={{ display: "none" }}>
                    {children}
                </div>
            </Box>
        </PlateElement>
    );
}