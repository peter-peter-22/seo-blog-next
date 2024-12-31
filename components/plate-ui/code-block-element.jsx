import { PlateElement } from '@udecode/plate-common/react';
import CodeEditor from 'react-simple-code-editor';
import { useEditorRef } from '@udecode/plate-common/react';
import { ReactEditor } from 'slate-react';
import {
    getBlockAbove,
    getBlocks,
    getNodeEntry,
    insertNodes,
    removeEmptyPreviousBlock,
    setNodes,
    unsetNodes,
    withoutNormalizing,
} from '@udecode/plate-common';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

export function CodeBlockElement({
    className,
    children,
    ...props
}) {
    const editor = useEditorRef();

    function onChange(e) {
        const value = e.target.value;
        const path = ReactEditor.findPath(editor, props.element); // Find the path of the node
        setNodes(editor, { value }, { at: path });
    }

    return (
        <PlateElement asChild className={className} {...props} contentEditable={false} >
            <textarea
                value={props.element.value}
                onChange={onChange}
            />
        </PlateElement>
    );
}