import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import isHotkey from 'is-hotkey';
import { useCallback, useMemo, useState } from 'react';
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
import TopMenu from './Toolbar/TopMenu';
import { withInlines } from './components/modules/EditorUrls';
import { onKeyDown as inlineOnKeyDown } from './components/modules/EditorUrls';
import placeholder from './components/modules/placeholder';
import { withEmbeds } from './components/modules/EditorVideo';
import { HoveringMenu } from './Toolbar/HoveringMenu';

const StyledEditable = styled(Editable)({
    fontFamily: "var(--font-roboto)",
    outline: "none",
    minHeight: "100vh !important",
});

const hotkeysOnKeyDown = (event, editor) => {
    for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
            event.preventDefault()
            const mark = HOTKEYS[hotkey]
            toggleMark(editor, mark)
        }
    }
}

export default function RichTextEditor({ onChange, slateProps, editorProps }) {
    const editor = useMemo(() => withEmbeds(withImages(withInlines(withHistory(withReact(createEditor()))))), []);
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
            <HoveringMenu />
            <EditableWithBackground editor={editor} editorProps={editorProps} />
        </Slate >
    )
}

//separate this component to prevent the focused state change from re-rendering other components
function EditableWithBackground({ editor, editorProps }) {
    const [focused, setFocused] = useState(false);

    const handleFocus=useCallback((e)=>{
        e.preventDefault();
        e.target.focus({preventScroll: true});
        setFocused(true);
    },[])

    return (
        <Card
            sx={theme => ({
                p: 1,
                borderColor: focused ? theme.palette.primary.light : "transparent",
                borderRadius: 1,
                borderStyle: "solid",
                transition: theme.transitions.create(['all'], {
                    duration: theme.transitions.duration.shorter,
                }),
            })}
            component={"article"}
        >
            <StyledEditable
                renderElement={Element}
                renderLeaf={Leaf}
                spellCheck
                onKeyDown={event => {
                    hotkeysOnKeyDown(event, editor);
                    inlineOnKeyDown(event, editor);
                }}
                {...editorProps}
                {...placeholder()}
                onFocus={handleFocus}
                onBlur={() => setFocused(false)}
            />
        </Card>
    )
}