import { ParagraphPlugin } from '@udecode/plate-common/react';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { basicNodesPlugins } from './basic-nodes-plugin';
import { alignPlugin } from './plugins/align-plugin';
import { CodeBlockPlugin } from './plugins/code-block-plugin';
import { FixedToolbarPlugin } from './plugins/fixed-toolbar-plugin';
import { indentListPlugins } from './plugins/indent-list-plugin';
import { linkPlugin } from './plugins/link.plugin';
import { mediaPlugins } from './plugins/media-plugins';
import { dndPlugins } from './plugins/dnd-plugins';
import { TogglePlugin } from '@udecode/plate-toggle/react';

export const viewPlugins = [
    ...basicNodesPlugins,
    linkPlugin,
    ...mediaPlugins,
    CodeBlockPlugin,
    TogglePlugin,
    
    // Block Style
    alignPlugin,
    ...indentListPlugins,
]

export const editorPlugins = [
    ...viewPlugins,

    //Functionalty
    TrailingBlockPlugin.configure({ options: { type: ParagraphPlugin.key } }),
    ...dndPlugins,

    //UI
    FixedToolbarPlugin
]