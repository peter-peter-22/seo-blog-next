import React from 'react';

import { cn } from '@udecode/cn';

import { CheckboxStatic } from './checkbox-static';

export const TodoMarkerStatic = ({
  element
}) => {
  return (
    (<div contentEditable={false}>
      <CheckboxStatic
        className="pointer-events-none absolute -left-6 top-1"
        checked={element.checked} />
    </div>)
  );
};

export const TodoLiStatic = ({
  children,
  element
}) => {
  return (
    (<span className={cn((element.checked) && 'text-muted-foreground line-through')}>
      {children}
    </span>)
  );
};
