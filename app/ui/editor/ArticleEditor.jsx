'use client';

import { useMemo } from "react";
import TextEditor from "./TextEditor";

export default function ArticleEditor() {
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ],
    []
  )

  return (
    <TextEditor
      initialValue={initialValue}
      onChange={value => {
        localStorage.setItem('content', value)
      }}
    />
  );
}