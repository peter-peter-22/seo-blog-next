
import { cn } from '@udecode/cn';
import { getNodeString } from '@udecode/plate-common';
import { PlateElement } from '@udecode/plate-common/react';

export function ImageElementStatic({
  children,
  className,
  nodeProps,
  ...props
}) {
  const {
    align = 'center',
    caption,
    url,
    width,
  } = props.element;

  return (
    (<PlateElement className={cn(className, 'py-2.5')} {...props}>
      <figure className="group relative m-0 inline-block" style={{ width }}>
        <div className="relative min-w-[92px] max-w-full" style={{ textAlign: align }}>
          <img
            className={cn('w-full max-w-full cursor-default object-cover px-0', 'rounded-sm')}
            alt={caption||""}
            src={url}
            {...nodeProps} />
          {caption && (
            <figcaption className="mx-auto mt-2 h-[24px] max-w-full">
              {getNodeString(caption[0])}
            </figcaption>
          )}
        </div>
      </figure>
      {children}
    </PlateElement>)
  );
}
