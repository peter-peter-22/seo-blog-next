import { styled } from '@mui/material';
import Card from '@mui/material/Card';
import isHotkey from 'is-hotkey';
import { useMemo } from 'react';
import {
    createEditor
} from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import { withImages } from './EditorImages';
import HOTKEYS from "./hotkeys.js";
import { Element, Leaf, toggleMark } from "./TextEditorComponents";
import TopMenu from "./TopMenu";

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
    }
}));

export default function RichTextEditor({ onChange, slateProps, editorProps }) {
    const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);
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
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event)) {
                                event.preventDefault()
                                const mark = HOTKEYS[hotkey]
                                toggleMark(editor, mark)
                            }
                        }
                    }}
                    {...editorProps}
                />
            </Card>
        </Slate >
    )
}