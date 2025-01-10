"use client"

import {
    Plate,
    PlateContent
} from '@udecode/plate-common/react';
import { editorPlugins } from '../lib/editor/editor-plugins';
import { useCreateEditor } from '../lib/editor/use-create-editor';

const value = [
    // ...
];

export default function BasicEditor() {
    const editor = useCreateEditor({
        plugins: editorPlugins,
        value
    })

    return (
        <Plate editor={editor}>
            <PlateContent />
        </Plate>
    );
}