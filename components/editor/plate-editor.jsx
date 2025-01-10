'use client';

import { createEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { Plate } from '@udecode/plate-common/react';
import { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function PlateEditor({ value, onChange }) {
  const editor = useMemo(() => createEditor({
    value
  }), [value])

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onChange={onChange}>
        <EditorContainer>
          <Editor placeholder="Write something..." />
        </EditorContainer>
      </Plate>
    </DndProvider>
  );
}
