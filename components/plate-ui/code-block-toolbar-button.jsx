import { withRef } from '@udecode/cn';
import { insertNodes } from '@udecode/plate-common';
import { useEditorRef } from '@udecode/plate-common/react';
import {
    Code2Icon
} from 'lucide-react';
import { Editor, Node } from 'slate';
import { CodeBlockPlugin } from '../editor/plugins/code-block-plugin';

import { ToolbarButton } from './toolbar';
export const CodeBlockButton = withRef((props, ref) => {
    const editor = useEditorRef();

    function insert() {
        //const text = getSelectedTextWithLineBreaks(editor);
        insertNodes(editor, {
            children: [{ text: "" }],
            //value: text,
            value:"",
            type: CodeBlockPlugin.key,
        });
    }

    return (
        <ToolbarButton ref={ref} data-plate-focus tooltip="Link" {...props} onClick={insert}>
            <Code2Icon />
        </ToolbarButton>
    );
});



function getSelectedTextWithLineBreaks(editor) {
    const selectedNodes = Array.from(
        Editor.nodes(editor, {
            at: editor.selection,
            match: node => {
                return !!node.type
            }, // Include only block elements
        })
    );

    // Extract text from each node and join with line breaks
    const textWithLineBreaks = selectedNodes
        .map(([node]) => Node.string(node)) // Get text content of each node
        .join('\n'); // Join with newline

    return textWithLineBreaks;
}