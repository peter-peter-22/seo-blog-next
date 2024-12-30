import { basicNodesPlugins } from './basic-nodes-plugin';
import { alignPlugin } from './plugins/align-plugin';
import { FixedToolbarPlugin } from './plugins/fixed-toolbar-plugin';
import { indentListPlugins } from './plugins/indent-list-plugin';
import { linkPlugin } from './plugins/link.plugin';

export const viewPlugins = [
    ...basicNodesPlugins,
    ...indentListPlugins,
    linkPlugin,

    // Block Style
    alignPlugin,
]

export const editorPlugins = [
    ...viewPlugins,

    //UI
    FixedToolbarPlugin
]