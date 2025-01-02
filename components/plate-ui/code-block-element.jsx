import "@/app/css/prism-vsc-dark-plus.css";
import Box from '@mui/material/Box';
import { PlateElement, setNode, useEditorRef, useElement } from '@udecode/plate-common/react';
import { highlight, languages } from 'prismjs/components/prism-core';
import CodeEditor from 'react-simple-code-editor';

//must be imported after prism-core
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { useState } from "react";

export function CodeBlockElement({
    className,
    children,
    ...props
}) {
    const editor = useEditorRef();
    const element = useElement();
    const [value, setValue] = useState(element.value);

    function onChange(value) {
        //const path = ReactEditor.findPath(editor, props.element); 
        //setNodes(editor, { ...props.element, value }, { at: path });
        setValue(value);
        setNode(editor, element, { value });
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
                    value={value}
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