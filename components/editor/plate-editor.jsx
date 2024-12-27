'use client';

import { Plate } from '@udecode/plate-common/react';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor } from '@/components/plate-ui/editor';

const value = [];

export function PlateEditor() {
  const editor = useCreateEditor({ value });

  return (
    (<Plate editor={editor}>
      <Editor variant="demo" placeholder="Type..." />
    </Plate>)
  );
}
