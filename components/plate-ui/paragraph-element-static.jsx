
import { cn } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common/react';

export const ParagraphElementStatic = ({
  children,
  className,
  ...props
}) => {
  return (
    (<PlateElement className={cn(className, 'm-0 px-0 py-1')} {...props}>
      {children}
    </PlateElement>)
  );
};
