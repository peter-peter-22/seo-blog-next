'use client';

import { TopToolbar } from '@/components/plate-ui/fixed-toolbar';
import { ToolbarGroup } from '@/components/plate-ui/toolbar';
import { createPlatePlugin } from '@udecode/plate-common/react';
import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon
} from 'lucide-react';

//buttons
import { AlignDropdownMenu } from '@/components/plate-ui/align-dropdown-menu';
import { CodeBlockButton } from '@/components/plate-ui/code-block-toolbar-button';
import {
    BulletedIndentListToolbarButton,
    NumberedIndentListToolbarButton,
} from '@/components/plate-ui/indent-list-toolbar-button';
import { IndentToolbarButton } from '@/components/plate-ui/indent-toolbar-button';
import { LinkToolbarButton } from '@/components/plate-ui/link-toolbar-button';
import { MarkToolbarButton } from '@/components/plate-ui/mark-toolbar-button';
import { MediaToolbarButtonExternal } from '@/components/plate-ui/media-toolbar-button';
import { ModeDropdownMenu } from '@/components/plate-ui/mode-dropdown-menu';
import { OutdentToolbarButton } from '@/components/plate-ui/outdent-toolbar-button';
import { ToggleToolbarButton } from '@/components/plate-ui/toggle-toolbar-button';
import { TurnIntoDropdownMenu } from '@/components/plate-ui/turn-into-dropdown-menu';

//plugins
import {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import {
    ImagePlugin,
    VideoPlugin
} from '@udecode/plate-media/react';

export const FixedToolbarPlugin = createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
        beforeEditable: ({ readOnly }) => (
            <TopToolbar>
                {!readOnly && <>
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
                        <ToggleToolbarButton />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <LinkToolbarButton />
                        <CodeBlockButton />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <MediaToolbarButtonExternal nodeType={ImagePlugin.key} />
                        <MediaToolbarButtonExternal nodeType={VideoPlugin.key} />
                    </ToolbarGroup>
                </>}

                <ToolbarGroup>
                    <ModeDropdownMenu />
                </ToolbarGroup>

            </TopToolbar>
        )
    },
});