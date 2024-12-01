'use client';

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { BlockButton, MarkButton } from "../components/HandleMarks";
import { InsertImageButton } from "../components/modules/EditorImages";
import { AddLinkButton, RemoveLinkButton } from "../components/modules/EditorUrls";
import { InsertVideoButton } from "../components/modules/EditorVideo";
import { ToggleCodeButton } from "../components/modules/codeblock/CodeBlock";
import { ToolbarBackground } from "./Components";

import Code from '@mui/icons-material/Code';
import FormatAlignCenter from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustify from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeft from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRight from '@mui/icons-material/FormatAlignRight';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import FormatQuote from '@mui/icons-material/FormatQuote';
import FormatUnderlined from '@mui/icons-material/FormatUnderlined';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import LooksOne from '@mui/icons-material/LooksOne';
import LooksTwo from '@mui/icons-material/LooksTwo';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

const TopMenu = () => {
    return (
        <Box sx={{ position: "sticky", top: 0, zIndex: 1 }}>
            <Toolbar />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ToolbarBackground>
                    <MarkButton format="bold" Icon={<FormatBold />} />
                    <MarkButton format="italic" Icon={<FormatItalic />} />
                    <MarkButton format="underline" Icon={<FormatUnderlined />} />
                    <AddLinkButton Icon={<LinkIcon />} />
                    <RemoveLinkButton Icon={<LinkOffIcon />} />
                    <BlockButton format="heading-one" Icon={<LooksOne />} />
                    <BlockButton format="heading-two" Icon={<LooksTwo />} />
                    <BlockButton format="block-quote" Icon={<FormatQuote />} />
                    <BlockButton format="numbered-list" Icon={<FormatListNumbered />} />
                    <BlockButton format="bulleted-list" Icon={<FormatListBulleted />} />
                    <BlockButton format="left" Icon={<FormatAlignLeft />} />
                    <BlockButton format="center" Icon={<FormatAlignCenter />} />
                    <BlockButton format="right" Icon={<FormatAlignRight />} />
                    <BlockButton format="justify" Icon={<FormatAlignJustify />} />
                    <ToggleCodeButton  Icon={<Code />} />
                    <InsertImageButton Icon={<ImageIcon />} />
                    <InsertVideoButton Icon={<OndemandVideoIcon />} />
                </ToolbarBackground>
            </Box>
        </Box>
    )
}

export default TopMenu;