"use client";

import { styled } from '@mui/material/styles';
import { useMemo } from 'react';
import {
    createEditor
} from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withImages } from './EditorImages';
import Element from './components/Element';
import Leaf from './components/Leaf';

const StyledEditable = styled(Editable)({
    fontFamily:"var(--font-roboto)"
});

export default function TextViewer({ slateProps, editorProps }) {
    const editor = useMemo(() => withImages(withReact(createEditor())), []);
    return (
        <Slate
            editor={editor}
            {...slateProps}
        >
            <StyledEditable
                renderElement={Element}
                renderLeaf={Leaf}
                {...editorProps}
            />
        </Slate >
    )
}