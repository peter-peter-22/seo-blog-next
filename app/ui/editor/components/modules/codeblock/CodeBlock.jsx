"use client";

import { styled } from '@mui/material/styles';
import { useCallback } from 'react';
import {
    Editor,
    Node,
    Range,
    Element as SlateElement,
    Transforms
} from 'slate';
import { ReactEditor, useReadOnly, useSlate, useSlateStatic } from 'slate-react';
import { MenuButton } from '../../../EditorUI';
import { lastUsedLanguage } from './CodeEditor';
import { CodeElementEditor } from './CodeEditor';
import CodeHighlighter from './CodeHighlighter';

export const CodeElement = (props) => {
    const isReadonly = useReadOnly();
    return isReadonly ? <CodeElementView {...props} /> : <CodeElementEditor {...props} />;
}

export const CodeElementView = ({ attributes, children, element }) => {
    // Combine all children into a single string for highlighting
    const codeString = element.children.map(n => Node.string(n)).join('\n')
    const { language } = element;

    return (
        <div {...attributes}>
            <CodeHighlighter code={codeString} language={language} />
        </div>
    );
};

function isCode(editor) {
    const [match] = Editor.nodes(editor, {
        match: (n) => SlateElement.isElement(n) && n.type === "code",
    });
    return !!match
}

function wrapCode(editor) {
    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const button = {
        type: 'code',
        language: lastUsedLanguage.get(),
        children: isCollapsed ? [{ type: "paragraph", children: [{ text: '' }] }] : [],
    }
    if (isCollapsed) {
        Transforms.insertNodes(editor, button)
    } else {
        Transforms.wrapNodes(editor, button, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

function unwrapCode(editor) {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'code',
    })
}

export const ToggleCodeButton = ({ Icon }) => {
    const editor = useSlate()
    const active = isCode(editor);
    return (
        <MenuButton
            active={active}
            onMouseDown={event => {
                event.preventDefault()
                if (active)
                    unwrapCode(editor);
                else
                    wrapCode(editor);
            }}
        >
            {Icon}
        </MenuButton>
    )
}