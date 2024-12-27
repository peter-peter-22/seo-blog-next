import { withProps } from '@udecode/cn';
import {
    PlateElement,
    PlateLeaf,
    usePlateEditor
} from '@udecode/plate-common/react';
import { editorPlugins, viewPlugins } from './editor-plugins';

//plugins
import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HeadingElement } from '@/components/plate-ui/heading-element';

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
