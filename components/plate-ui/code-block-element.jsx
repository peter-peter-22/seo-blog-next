import "@/app/css/prism-vsc-dark-plus.css";
import Box from '@mui/material/Box';
import { cn } from '@udecode/cn';
import { useCodeBlockElementState } from '@udecode/plate-code-block/react';
import { PlateElement, setNode, useEditorRef } from '@udecode/plate-common/react';
import { highlight } from "prismjs";
import { useState } from "react";
import CodeEditor from 'react-simple-code-editor';
import { CodeBlockCombobox, Prism } from "./code-block-combo-box";

export function CodeBlockElement({
    className,
    children,
    ...props
}) {
    const editor = useEditorRef();
    const { element } = props;
    const [value, setValue] = useState(element.value);
    const state = useCodeBlockElementState({ element });

    function onChange(value) {
        //const path = ReactEditor.findPath(editor, props.element); 
        //setNodes(editor, { ...props.element, value }, { at: path });
        setValue(value);
        setNode(editor, element, { value });
    }

    return (
        <PlateElement
            asChild
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
                            borderColor: theme.palette.primary.light,
                        },
                        ...theme.applyStyles("dark", {
                            background: "#0e0e0e !important"
                        })
                    })}>
                    <CodeEditor
                        value={value}
                        onValueChange={onChange}
                        highlight={(code) => highlight(code, Prism.languages[element.lang ?? "text"])}
                    />
                </Box>
                <Box sx={{
                    position: "absolute",
                    right: 5,
                    top: 3,
                    color: "white"//force white color because of the back balckground
                }}>
                    <CodeBlockCombobox />
                </Box>
                <Box style={{ display: "none" }}>
                    {children}
                </Box>
            </Box>
        </PlateElement>
    );
}