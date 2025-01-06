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
      sx={theme => ({
        overflow: "visible",
        p: 3,
        outlineWidth: 1,
        outlineStyle: "solid",
        outlineColor: "transparent",
        "&:focus-within": {
          outlineColor: "primary.main",
        },
        transition: theme.transitions.create(['outline-color'], {
          duration: theme.transitions.duration.shorter,
        }),
      })}>
      {children}
    </Card>
  )
}

export const EditorContainerStatic = ({ children }) => {
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
  marginTop:15
})

Editor.displayName = 'Editor';
