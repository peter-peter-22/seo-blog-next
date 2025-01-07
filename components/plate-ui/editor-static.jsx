'use client';;

import { styled } from '@mui/material/styles';
import {
  PlateContent
} from '@udecode/plate-common/react';
import Card from '@mui/material/Card';

export const EditorContainer = ({ children }) => {
    return (
      <Card
        data-registry="plate"
        sx={{
          p: 3,
        }}>
        {children}
      </Card>
    )
  }

EditorContainer.displayName = 'EditorContainer';

export const Editor = styled(PlateContent)({
  minHeight: "100vh !important",
  outline: "none",
})

Editor.displayName = 'Editor';
