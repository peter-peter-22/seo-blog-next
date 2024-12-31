"use client"

import { PlateElement, PlateElementProps } from '@udecode/plate-common/react';

export function TestElement({
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
