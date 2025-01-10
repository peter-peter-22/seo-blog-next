'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';

import { PlateElement } from './plate-element';

export const BlockquoteElement = withRef(({ children, className, ...props }, ref) => {
  return (
    (<PlateElement
      ref={ref}
      as="blockquote"
      className={cn(className, 'border-l-2 pl-6 italic')}
      style={{borderColor:"var(--mui-palette-divider)"}}
      {...props}>
      {children}
    </PlateElement>)
  );
});
