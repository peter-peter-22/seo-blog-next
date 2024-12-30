import { basicNodesPlugins } from './basic-nodes-plugin';
import { alignPlugin } from './plugins/align-plugin';
import { FixedToolbarPlugin } from './plugins/fixed-toolbar-plugin';
import { indentListPlugins } from './plugins/indent-list-plugin';
import { linkPlugin } from './plugins/link.plugin';
import { mediaPlugins } from './plugins/media-plugins';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { ParagraphPlugin } from '@udecode/plate-common/react';

export const viewPlugins = [
    ...basicNodesPlugins,
    ...indentListPlugins,
    linkPlugin,
    ...mediaPlugins,

    // Block Style
    alignPlugin,
]

export const editorPlugins = [
    ...viewPlugins,

    //Functionalty
    TrailingBlockPlugin.configure({ options: { type: ParagraphPlugin.key } }),

    //UI
    FixedToolbarPlugin
]