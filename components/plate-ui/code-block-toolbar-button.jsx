import { useEditorRef } from '@udecode/plate-common/react';
import { insertNodes, isUrl } from '@udecode/plate-common';
import { CodeBlockPlugin } from '../editor/plugins/code-block-plugin';
import { Editor } from 'slate';

export function CodeBlockButton() {
    const editor = useEditorRef();

    function insert() {
        const text = getSelectionText(editor);
        insertNodes(editor, {
            children: [{ text: text }],
            type: CodeBlockPlugin.key,
        });
    }

    return (
        <button onClick={insert}>test</button>
    )
}

function getSelectionText(editor) {
    if (!editor.selection) {
        return ''; // No selection
    }

    const selectedText = Editor.string(editor, editor.selection);
    return selectedText;
}