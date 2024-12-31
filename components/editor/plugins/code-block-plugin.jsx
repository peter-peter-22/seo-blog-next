import { TestElement } from '@/components/plate-ui/test-element';
import { insertNodes } from '@udecode/plate-common';
import { createPlatePlugin } from '@udecode/plate-common/react';
import {
    ImagePlugin
} from '@udecode/plate-media/react';

export const MyPlugin = createPlatePlugin({
    key: 'test',
    options: {
        count: 0,
    },
    node: {
        component: TestElement
    }
}).extend(({ editor, plugin, setOption }) => ({
    handlers: {
        onClick: () => {
            setOption('count', 1);
        },
    },
    shortcuts: {
        newShortcut: {
            handler: ({ editor }) => {
                insertNodes(editor, {
                    children: [{ text: '' }],
                    name: "test",
                    type: ImagePlugin.key,
                    url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                });
            },
            keys: 'mod+x',
        },
    },
}));