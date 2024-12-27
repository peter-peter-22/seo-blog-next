import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';

export const viewPlugins = [
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    HeadingPlugin,
    BlockquotePlugin
]

export const editorPlugins = [
    ...viewPlugins
]