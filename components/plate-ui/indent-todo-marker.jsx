'use client';;
import { cn } from '@udecode/cn';
import {
  useIndentTodoListElement,
  useIndentTodoListElementState,
} from '@udecode/plate-indent-list/react';
import { useReadOnly } from 'slate-react';

import { Checkbox } from './checkbox';

export const TodoMarker = ({
  element
}) => {
  const state = useIndentTodoListElementState({ element });
  const { checkboxProps } = useIndentTodoListElement(state);
  const readOnly = useReadOnly();

  return (
    (<div contentEditable={false}>
      <Checkbox
        className={cn('absolute -left-6 top-1', readOnly && 'pointer-events-none')}
        {...checkboxProps} />
    </div>)
  );
};

export const TodoLi = (props) => {
  const { children, element } = props;

  return (
    (<span className={cn((element.checked) && 'text-muted-foreground line-through')}>
      {children}
    </span>)
  );
};
