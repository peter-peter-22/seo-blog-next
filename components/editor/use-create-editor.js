import { withProps } from '@udecode/cn';
import { HEADING_KEYS } from '@udecode/plate-heading';
import {
    AudioPlugin,
    FilePlugin,
    ImagePlugin,
    VideoPlugin,
} from '@udecode/plate-media/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { ListElement } from '@/components/plate-ui/list-element';
import { TodoListElement } from '@/components/plate-ui/todo-list-element';
import {
    PlateElement,
    PlateLeaf,
    usePlateEditor
} from '@udecode/plate-common/react';
import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
    BulletedListPlugin,
    ListItemPlugin,
    NumberedListPlugin,
    TodoListPlugin
} from '@udecode/plate-list/react';
import { editorPlugins, viewPlugins } from './editor-plugins';
import { LinkElement } from '@/components/plate-ui/link-element';
import { ImageElement } from '@/components/plate-ui/image-element';

export const viewComponents = {
    [BlockquotePlugin.key]: withProps(PlateLeaf, { as: 'blockquote' }),
    [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
    [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
    [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
    [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
    [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
    [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
    [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
    [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
    [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
    [BulletedListPlugin.key]: withProps(ListElement, { variant: 'ul' }),
    [ListItemPlugin.key]: withProps(PlateElement, { as: 'li' }),
    [NumberedListPlugin.key]: withProps(ListElement, { variant: 'ol' }),
    [TodoListPlugin.key]: TodoListElement,
    [LinkPlugin.key]: LinkElement,
    [ImagePlugin.key]: ImageElement,
}

export const editorComponents = {
    ...viewComponents
}

export const useCreateEditor = ({
    components,
    override,
    readOnly,
    ...options
}) => {
    return usePlateEditor(
        {
            override: {
                components: {
                    ...(readOnly ? viewComponents : editorComponents),
                    ...components,
                },
                ...override,
            },
            plugins: (readOnly ? viewPlugins : editorPlugins),
            ...options,
        }
    );
};
