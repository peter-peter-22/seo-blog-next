'use client';

import { createPlatePlugin } from '@udecode/plate-common/react';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { ToolbarGroup } from '@/components/plate-ui/toolbar';
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

//buttons
import { MarkToolbarButton } from '@/components/plate-ui/mark-toolbar-button';
import { TurnIntoDropdownMenu } from '@/components/plate-ui/turn-into-dropdown-menu';
import { AlignDropdownMenu } from '@/components/plate-ui/align-dropdown-menu';
import {
    BulletedIndentListToolbarButton,
    NumberedIndentListToolbarButton,
} from '@/components/plate-ui/indent-list-toolbar-button';
import { IndentToolbarButton } from '@/components/plate-ui/indent-toolbar-button';
import { OutdentToolbarButton } from '@/components/plate-ui/outdent-toolbar-button';
import { LinkToolbarButton } from '@/components/plate-ui/link-toolbar-button';
import { MediaToolbarButton } from '@/components/plate-ui/media-toolbar-button';

//plugins
import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';

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

                    <NumberedIndentListToolbarButton />
                    <BulletedIndentListToolbarButton />

                    <IndentToolbarButton />
                    <OutdentToolbarButton />

                </ToolbarGroup>

                <ToolbarGroup>
                    <LinkToolbarButton />
                </ToolbarGroup>

                <ToolbarGroup>
                    <MediaToolbarButton nodeType={ImagePlugin.key} />
                    <MediaToolbarButton nodeType={VideoPlugin.key} />
                    <MediaToolbarButton nodeType={AudioPlugin.key} />
                    <MediaToolbarButton nodeType={FilePlugin.key} />
                </ToolbarGroup>

            </FixedToolbar>
        ),
    },
});