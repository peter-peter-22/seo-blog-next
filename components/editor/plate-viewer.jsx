'use client';

import { createEditor } from '@/components/editor/use-create-editor';
import { Plate } from '@udecode/plate-common/react';
import { useMemo } from 'react';
import { EditorContainerStatic, EditorStatic } from '../plate-ui/editor-static';

export function PlateViewer({ value }) {
  const editor = useMemo(() => createEditor({
    value: value || [],
    readOnly: true
  }), [value])

  return (
    <Plate editor={editor} readOnly={true}>
      <EditorContainerStatic>
        <EditorStatic />
      </EditorContainerStatic>
    </Plate>
  );
}
