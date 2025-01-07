import { ColumnElement } from '@/components/plate-ui/column-element';
import { ColumnGroupElement } from '@/components/plate-ui/column-group-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { ImageElement } from '@/components/plate-ui/image-element';
import { LinkElement } from '@/components/plate-ui/link-element';
import { ListElement } from '@/components/plate-ui/list-element';
import { MediaVideoElement } from '@/components/plate-ui/media-video-element';
import { TodoListElement } from '@/components/plate-ui/todo-list-element';
import { ToggleElement } from '@/components/plate-ui/toggle-element';
import { withProps } from '@udecode/cn';
import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
    ParagraphPlugin,
    PlateElement,
    PlateLeaf,
    usePlateEditor,
    createPlateEditor
} from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import {
    BulletedListPlugin,
    ListItemPlugin,
    NumberedListPlugin,
    TodoListPlugin
} from '@udecode/plate-list/react';
import {
    ImagePlugin,
    VideoPlugin
} from '@udecode/plate-media/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import { BlockquoteElement } from '../plate-ui/blockquote-element';
import { BlockquoteElementStatic } from '../plate-ui/blockquote-element-static';
import { ColumnElementStatic } from '../plate-ui/column-element-static';
import { ColumnGroupElementStatic } from '../plate-ui/column-group-element-static';
import { HeadingElementStatic } from '../plate-ui/heading-element-static';
import { ImageElementStatic } from '../plate-ui/image-element-static';
import { LinkElementStatic } from '../plate-ui/link-element-static';
import { MediaVideoElementStatic } from '../plate-ui/media-video-element-static';
import { ParagraphElement } from '../plate-ui/paragraph-element';
import { ParagraphElementStatic } from '../plate-ui/paragraph-element-static';
import { ToggleElementStatic } from '../plate-ui/toggle-element-static';
import { editorPlugins, viewPlugins } from './editor-plugins';
import { CodeBlockPlugin } from './plugins/code-block-plugin';
import { CodeBlockElement } from '../plate-ui/code-block-element';
import { CodeBlockElementStatic } from '../plate-ui/code-block-element-static';

export const viewComponents = {
    [BlockquotePlugin.key]: BlockquoteElementStatic,
    [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
    [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
    [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
    [HEADING_KEYS.h1]: withProps(HeadingElementStatic, { variant: 'h1' }),
    [HEADING_KEYS.h2]: withProps(HeadingElementStatic, { variant: 'h2' }),
    [HEADING_KEYS.h3]: withProps(HeadingElementStatic, { variant: 'h3' }),
    [HEADING_KEYS.h4]: withProps(HeadingElementStatic, { variant: 'h4' }),
    [HEADING_KEYS.h5]: withProps(HeadingElementStatic, { variant: 'h5' }),
    [HEADING_KEYS.h6]: withProps(HeadingElementStatic, { variant: 'h6' }),
    [BulletedListPlugin.key]: withProps(ListElement, { variant: 'ul' }),
    [ListItemPlugin.key]: withProps(PlateElement, { as: 'li' }),
    [NumberedListPlugin.key]: withProps(ListElement, { variant: 'ol' }),
    [TodoListPlugin.key]: TodoListElement,
    [LinkPlugin.key]: LinkElementStatic,
    [ImagePlugin.key]: ImageElementStatic,
    [VideoPlugin.key]: MediaVideoElementStatic,
    [ParagraphPlugin.key]: ParagraphElementStatic,
    [TogglePlugin.key]: ToggleElementStatic,
    [ColumnItemPlugin.key]: ColumnElementStatic,
    [ColumnPlugin.key]: ColumnGroupElementStatic,
    [CodeBlockPlugin.key]: CodeBlockElementStatic
}

export const editorComponents = {
    ...viewComponents,
    [BlockquotePlugin.key]: BlockquoteElement,
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
    [VideoPlugin.key]: MediaVideoElement,
    [ParagraphPlugin.key]: ParagraphElement,
    [TogglePlugin.key]: ToggleElement,
    [ColumnItemPlugin.key]: ColumnElement,
    [ColumnPlugin.key]: ColumnGroupElement,
    [CodeBlockPlugin.key]: CodeBlockElement
}

export const useCreateEditor = ({
    readOnly,
    ...options
}) => {
    return usePlateEditor(
        {
            override: {
                components: readOnly ? viewComponents : editorComponents,
            },
            plugins: (readOnly ? viewPlugins : editorPlugins),
            ...options,
        }
    );
};

export function createEditor({ readOnly, ...options }) {
    return createPlateEditor({
        override: {
            components: readOnly ? viewComponents : editorComponents,
        },
        plugins: (readOnly ? viewPlugins : editorPlugins),
        ...options,
    })
}
