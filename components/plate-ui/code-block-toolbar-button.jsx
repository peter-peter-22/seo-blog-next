import { getNodes, insertNodes, isText } from '@udecode/plate-common';
import { useEditorRef } from '@udecode/plate-common/react';
import { Editor, Node, Text } from 'slate';
import { CodeBlockPlugin } from '../editor/plugins/code-block-plugin';
import { getSelectionText } from "@udecode/slate-utils";

export function CodeBlockButton() {
    const editor = useEditorRef();

    function insert() {
        const text = getSelectionTextWithLineBreaks(editor);
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

const getSelectionTextWithLineBreaks = (editor) => {
    return getSelectionText(editor);
};