import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import isHotkey from 'is-hotkey';
import { useMemo } from 'react';
import {
    createEditor
} from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import Element from './components/Element';
import Leaf from './components/Leaf';
import { toggleMark } from "./components/HandleMarks";
import { withImages } from './components/modules/EditorImages';
import HOTKEYS from "./hotkeys.js";
import TopMenu from "./TopMenu";
import { withInlines } from './components/modules/EditorUrls';
import { onKeyDown as inlineOnKeyDown } from './components/modules/EditorUrls';

const StyledEditable = styled(Editable)(({ theme }) => ({
    padding: 10,
    outlineWidth: 1,
    outlineStyle: "auto",
    minHeight: "100vh !important",
    outlineColor: theme.palette.divider,
    transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.shorter,
    }),
    "&:focus": {
        outlineColor: theme.palette.primary.light,
    },
    fontFamily: "var(--font-roboto)"
}));

const hotkeysOnKeyDown = (event,editor) => {
    for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
            event.preventDefault()
            const mark = HOTKEYS[hotkey]
            toggleMark(editor, mark)
        }
    }
}

export default function RichTextEditor({ onChange, slateProps, editorProps }) {
    const editor = useMemo(() => withInlines(withImages(withHistory(withReact(createEditor())))), []);
    return (
        <Slate
            editor={editor}
            onChange={value => {
                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                    // Save the value to Local Storage.
                    if (onChange)
                        onChange(value);
                }
            }}
            {...slateProps}
        >
            <TopMenu />
            <Card>
                <StyledEditable
                    renderElement={Element}
                    renderLeaf={Leaf}
                    spellCheck
                    onKeyDown={event => {
                        hotkeysOnKeyDown(event,editor);
                        inlineOnKeyDown(event,editor);
                    }}
                    {...editorProps}
                />
            </Card>
        </Slate >
    )
}