'use client';

import { createPlatePlugin } from '@udecode/plate-common/react';

import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { ToolbarGroup } from '@/components/plate-ui/toolbar';
import { MarkToolbarButton } from '@/components/plate-ui/mark-toolbar-button';
import { TurnIntoDropdownMenu } from '@/components/plate-ui/turn-into-dropdown-menu';
import { AlignDropdownMenu } from '@/components/plate-ui/align-dropdown-menu';
import { ListToolbarButton } from '@/components/plate-ui/list-toolbar-button';

import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';

import {
    ArrowUpToLineIcon,
    BaselineIcon,
    BoldIcon,
    Code2Icon,
    HighlighterIcon,
    ItalicIcon,
    PaintBucketIcon,
    StrikethroughIcon,
    UnderlineIcon,
    WandSparklesIcon,
} from 'lucide-react';

export const FixedToolbarPlugin = createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
        beforeEditable: () => (
            <FixedToolbar>

                <ToolbarGroup>
                    <TurnIntoDropdownMenu />
                </ToolbarGroup>

                <ToolbarGroup>

                    <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
                        <BoldIcon />
                    </MarkToolbarButton>

                    <MarkToolbarButton
                        nodeType={ItalicPlugin.key}
                        tooltip="Italic (⌘+I)"
                    >
                        <ItalicIcon />
                    </MarkToolbarButton>

                    <MarkToolbarButton
                        nodeType={UnderlinePlugin.key}
                        tooltip="Underline (⌘+U)"
                    >
                        <UnderlineIcon />
                    </MarkToolbarButton>

                </ToolbarGroup>

                <ToolbarGroup>
                    <AlignDropdownMenu />

                    <ListToolbarButton />
                </ToolbarGroup>

            </FixedToolbar>
        ),
    },
});