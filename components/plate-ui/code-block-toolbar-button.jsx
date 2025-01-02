import { insertNodes } from '@udecode/plate-common';
import { useEditorRef } from '@udecode/plate-common/react';
import { Editor, Node } from 'slate';
import { CodeBlockPlugin } from '../editor/plugins/code-block-plugin';

export function CodeBlockButton() {
    const editor = useEditorRef();

    function insert() {
        const text = getSelectedTextWithLineBreaks(editor);
        insertNodes(editor, {
            children: [{ text: "" }],
            value: text,
            type: CodeBlockPlugin.key,
        });
    }

    return (
        <button onClick={insert}>test</button>
    )
}


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