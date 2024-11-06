'use client';

import React from "react";
import TextEditor from "./TextEditor";
import EditorBottomMenu from "./bottomMenu/EditorBottomMenu";
import { useActionState } from 'react';
import { publishArticle } from "./actions/publishArticle";

export default function ArticleEditor() {
  const initialValue = React.useMemo(getInitialValue, []);
  const contentRef = React.useRef(initialValue);

  const onSubmit = (e) => {
    e.preventDefault();
    publishArticle(contentRef.current);
  }

  return (
    <form onSubmit={onSubmit}>
      <TextEditor
        slateProps={{
          initialValue,
        }}
        onChange={value => {
          contentRef.current = value;
          localStorage.setItem('content', JSON.stringify(value))
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