'use client';

import { createPlatePlugin } from '@udecode/plate-common/react';

import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { ToolbarGroup } from '@/components/plate-ui/toolbar';
import { MarkToolbarButton } from '@/components/plate-ui/mark-toolbar-button';

import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';

export const FixedToolbarPlugin = createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
        beforeEditable: () => (
            <FixedToolbar>
                <ToolbarGroup>

                    <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
                        <FormatBoldIcon />
                    </MarkToolbarButton>

                    <MarkToolbarButton
                        nodeType={ItalicPlugin.key}
                        tooltip="Italic (⌘+I)"
                    >
                        <FormatItalicIcon />
                    </MarkToolbarButton>

                    <MarkToolbarButton
                        nodeType={UnderlinePlugin.key}
                        tooltip="Underline (⌘+U)"
                    >
                        <FormatUnderlinedIcon />
                    </MarkToolbarButton>
                    
                </ToolbarGroup>
            </FixedToolbar>
        ),
    },
});