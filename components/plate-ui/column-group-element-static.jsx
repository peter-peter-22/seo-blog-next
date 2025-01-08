
import { cn } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common/react';

export function ColumnGroupElementStatic({
  children,
  className,
  ...props
}) {
  return (
    (<PlateElement className={cn(className, 'mb-2')} {...props}>
      <div className={cn('flex size-full rounded')}>{children}</div>
    </PlateElement>)
  );
}
