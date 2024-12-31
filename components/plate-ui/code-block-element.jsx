import {
    setNodes
} from '@udecode/plate-common';
import { PlateElement, useEditorRef } from '@udecode/plate-common/react';
import { ReactEditor } from 'slate-react';

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
                style={{ width: "100%",height:500 }}
            />
        </PlateElement>
    );
}