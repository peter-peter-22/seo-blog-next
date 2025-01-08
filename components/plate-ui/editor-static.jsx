'use client';;

import { styled } from '@mui/material/styles';
import {
  PlateContent
} from '@udecode/plate-common/react';
import Card from '@mui/material/Card';

export const EditorContainerStatic = ({ children }) => {
  return (
    <Card
      data-registry="plate"
      component="article"
      sx={{
        p: 3,
      }}>
      {children}
    </Card>
  )
}

export const EditorStatic = styled(PlateContent)({
  minHeight: "100vh !important",
  outline: "none",
})