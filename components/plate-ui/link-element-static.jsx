
import { cn } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common/react';

export const LinkElementStatic = ({
  children,
  className,
  ...props
}) => {
  return (
    (<PlateElement
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
    </PlateElement>)
  );
};
