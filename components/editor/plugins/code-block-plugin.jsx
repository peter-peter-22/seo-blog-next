import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { createPlatePlugin } from '@udecode/plate-common/react';

export const CodeBlockPlugin = createPlatePlugin({
    key: 'code-block',
    node: {
        isElement: true,
        type: 'code-block',
        component: CodeBlockElement,
    },
});