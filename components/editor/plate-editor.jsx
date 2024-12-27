'use client';

import { Plate } from '@udecode/plate-common/react';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor } from '@/components/plate-ui/editor';
import { defaultValue } from './default-value';

const value = defaultValue;

export function PlateEditor() {
  const editor = useCreateEditor({ value });

  return (
    (<Plate editor={editor}>
      <Editor variant="demo" placeholder="Type..." />
    </Plate>)
  );
}
