import { basicNodesPlugins } from './basic-nodes-plugin';
import { FixedToolbarPlugin } from './plugins/fixed-toolbar-plugin';

export const viewPlugins = [
   ...basicNodesPlugins
]

export const editorPlugins = [
    ...viewPlugins,
    FixedToolbarPlugin
]