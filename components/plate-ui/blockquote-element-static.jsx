
import { cn } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common/react';

export const BlockquoteElementStatic = ({
  children,
  className,
  ...props
}) => {
  return (
    (<PlateElement
      as="blockquote"
      className={cn(className, 'border-l-2 pl-6 italic')}
      style={{borderColor:"var(--mui-palette-divider)"}}
      {...props}>
      {children}
    </PlateElement>)
  );
};
