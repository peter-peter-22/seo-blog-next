'use client';

import TextViewer from "./TextViewer";

export default function ArticleViewer({article:initialValue}) {
    return (
        <TextViewer
            slateProps={{
                initialValue
            }}
            editorProps={{
                readOnly: true
            }}
        />
    );
}