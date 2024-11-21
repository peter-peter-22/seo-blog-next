"use client";

import { styled } from '@mui/material/styles';
import { useMemo } from 'react';
import {
    createEditor
} from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withImages } from './EditorImages';
import { Element, Leaf } from "./TextEditorComponents";

const StyledEditable = styled(Editable)({
    fontFamily: 'inherit',
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