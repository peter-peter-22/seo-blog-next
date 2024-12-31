import {
    setNodes
} from '@udecode/plate-common';
import { PlateElement, useEditorRef } from '@udecode/plate-common/react';
import { ReactEditor } from 'slate-react';
import React, { useState } from 'react';
import CodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
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
            <div contentEditable={false}>
                {children}
                <CodeEditor
                    value={props.element.value}
                    onValueChange={onChange}
                    highlight={(code) => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </div>
        </PlateElement>
    );
}