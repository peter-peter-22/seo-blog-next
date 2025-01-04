import React from 'react';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate-common';

export const LinkElementStatic = ({
  children,
  className,
  ...props
}) => {
  return (
    (<SlateElement
      as="a"
      className={cn(
        className,
        'font-medium text-primary underline decoration-primary underline-offset-4'
      )}
      style={{
        color: "var(--mui-palette-primary-main)",
        textDecorationColor: "unset"
      }}
      {...props}>
      {children}
    </SlateElement>)
  );
};
