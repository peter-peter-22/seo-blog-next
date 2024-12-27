import { basicNodesPlugins } from './basic-nodes-plugin';
import { alignPlugin } from './plugins/align-plugin';
import { FixedToolbarPlugin } from './plugins/fixed-toolbar-plugin';
import {
    BulletedListPlugin,
    ListItemPlugin,
    ListPlugin,
    NumberedListPlugin,
    TodoListPlugin,
} from '@udecode/plate-list/react';

export const viewPlugins = [
    ...basicNodesPlugins,

    ListPlugin,
    TodoListPlugin,

    // Block Style
    alignPlugin,
]

export const editorPlugins = [
    ...viewPlugins,

    //UI
    FixedToolbarPlugin
]