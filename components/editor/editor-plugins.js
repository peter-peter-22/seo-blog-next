import { basicNodesPlugins } from './basic-nodes-plugin';
import { alignPlugin } from './plugins/align-plugin';
import { FixedToolbarPlugin } from './plugins/fixed-toolbar-plugin';
import { indentListPlugins } from './plugins/indent-list-plugin';

export const viewPlugins = [
    ...basicNodesPlugins,
    ...indentListPlugins,

    // Block Style
    alignPlugin,
]

export const editorPlugins = [
    ...viewPlugins,

    //UI
    FixedToolbarPlugin
]