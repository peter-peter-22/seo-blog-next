
import { cn } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common/react';

export function ColumnElementStatic({
  children,
  className,
  ...props
}) {
  const { width } = props.element;

  return (
    (<div className="group/column relative" style={{ width: width ?? '100%' }}>
      <PlateElement
        className={cn(
          className,
          'h-full px-2 pt-2 group-first/column:pl-0 group-last/column:pr-0'
        )}
        {...props}>
        <div className={cn('relative h-full border border-transparent p-1.5')}>
          {children}
        </div>
      </PlateElement>
    </div>)
  );
}
