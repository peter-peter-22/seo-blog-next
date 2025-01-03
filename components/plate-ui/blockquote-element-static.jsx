import React from 'react';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate-common';

export const BlockquoteElementStatic = ({
  children,
  className,
  ...props
}) => {
  return (
    (<SlateElement
      as="blockquote"
      className={cn(className, 'border-l-2 pl-6 italic')}
      {...props}>
      {children}
    </SlateElement>)
  );
};
