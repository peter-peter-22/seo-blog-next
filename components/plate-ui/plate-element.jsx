'use client';;
import React from 'react';

import { cn } from '@udecode/cn';
import { PlateElement as PlateElementPrimitive } from '@udecode/plate-common/react';

import { BlockSelection } from './block-selection';

export const PlateElement = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    (<PlateElementPrimitive ref={ref} className={cn(className, 'relative')} {...props}>
      {children}
      {className?.includes('slate-selectable') && <BlockSelection />}
    </PlateElementPrimitive>)
  );
});
PlateElement.displayName="PlateElement";
