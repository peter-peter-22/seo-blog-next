'use client';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor } from '@/components/plate-ui/editor';
import { Plate } from '@udecode/plate-common/react';
import { defaultValue } from './default-value';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const value = defaultValue;

export function PlateEditor() {
  const editor = useCreateEditor({ value });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <Editor variant="fullWidth" placeholder="Type..." />
      </Plate>
    </DndProvider>
  );
}
