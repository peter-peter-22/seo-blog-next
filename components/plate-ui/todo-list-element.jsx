'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';
import {
  useTodoListElement,
  useTodoListElementState,
} from '@udecode/plate-list/react';

import { Checkbox } from './checkbox';
import { PlateElement } from './plate-element';

export const TodoListElement = withRef(({ children, className, ...props }, ref) => {
  const { element } = props;
  const state = useTodoListElementState({ element });
  const { checkboxProps } = useTodoListElement(state);

  return (
    (<PlateElement ref={ref} className={cn(className, 'flex flex-row py-1')} {...props}>
      <div
        className="mr-1.5 flex select-none items-center justify-center"
        contentEditable={false}>
        <Checkbox {...checkboxProps} />
      </div>
      <span
        className={cn(
          'flex-1 focus:outline-none',
          state.checked && 'text-muted-foreground line-through'
        )}
        contentEditable={!state.readOnly}
        suppressContentEditableWarning>
        {children}
      </span>
    </PlateElement>)
  );
});
