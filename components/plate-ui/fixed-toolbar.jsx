'use client';

import { withCn } from '@udecode/cn';

import { Toolbar } from './toolbar';
import {styled} from '@mui/material/styles';

export const FixedToolbar = withCn(
  Toolbar,
  'supports-backdrop-blur:bg-background/60 sticky left-0 top-0 z-50 w-full justify-between overflow-x-auto rounded-lg border border-b-border bg-background/95 p-1 backdrop-blur scrollbar-hide'
);

const TopToolbar = styled(FixedToolbar)({
  flexWrap: "wrap",
  justifyContent: "center",
  top:100,
  position:"sticky",
  borderRadius:5,
});

export {TopToolbar};
