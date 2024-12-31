import { PlateElement } from '@udecode/plate-common/react';

export function CodeBlockElement({
    className,
    children,
    ...props
}) {
    
    return (
        <PlateElement asChild className={className} {...props}>
            <blockquote>{children}</blockquote>
        </PlateElement>
    );
}