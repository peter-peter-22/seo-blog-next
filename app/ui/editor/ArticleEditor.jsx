'use client';

import React from "react";
import TextEditor from "./TextEditor";
import EditorBottomMenu from "./bottomMenu/EditorBottomMenu";

export default function ArticleEditor() {
  const initialValue = React.useMemo(getInitialValue, []);

  return (
    <form>
      <TextEditor
        slateProps={{
          initialValue,
        }}
        onChange={value => {
          localStorage.setItem('content', value)
        }}
      />
      <EditorBottomMenu />
    </form>
  );
}

const defaultValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

function getInitialValue() {
  try {
    return JSON.parse(localStorage.getItem('content')) || defaultValue;
  }
  catch {
    return defaultValue;
  }
}