'use client';

import { styled } from '@mui/material'
import isHotkey from 'is-hotkey'
import { useCallback, useMemo } from 'react'
import {
    createEditor,
    Editor,
    Element as SlateElement,
    Transforms,
} from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, useSlate, withReact, ReactEditor, useSelected, useFocused,useSlateStatic } from 'slate-react'
import { MenuButton } from './EditorUI'
import HOTKEYS from "./hotkeys.js"
import TopMenu from "./TopMenu"
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const StyledEditable = styled(Editable)(({ theme }) => ({
    padding: 10,
    outlineColor: theme.palette.divider,
}));

const TextEditor = ({ onChange, ...props }) => {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), [])
    return (
        <Slate
            editor={editor}
            onChange={value => {
                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                    // Save the value to Local Storage.
                    const content = JSON.stringify(value)
                    if (onChange)
                        onChange(content);
                }
            }}
            {...props}
        >
            <TopMenu />
            <StyledEditable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                onKeyDown={event => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event)) {
                            event.preventDefault()
                            const mark = HOTKEYS[hotkey]
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </Slate >
    )
}
const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    })
    let newProperties
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        }
    }
    Transforms.setNodes(editor, newProperties)
    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}
const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}
const isBlockActive = (editor, format, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false
    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n[blockType] === format,
        })
    )
    return !!match
}
const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}
const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        case 'image':
            return <Image
                attributes={attributes}
                children={children}
                element={element}
            />
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}
const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }
    if (leaf.code) {
        children = <code>{children}</code>
    }
    if (leaf.italic) {
        children = <em>{children}</em>
    }
    if (leaf.underline) {
        children = <u>{children}</u>
    }
    return <span {...attributes}>{children}</span>
}
const BlockButton = ({ format, Icon }) => {
    const editor = useSlate()
    return (
        <MenuButton
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            )}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            {Icon}
        </MenuButton>
    )
}
const MarkButton = ({ format, Icon }) => {
    const editor = useSlate()
    return (
        <MenuButton
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            {Icon}
        </MenuButton>
    )
}

const withImages = editor => {
    const { insertData, isVoid } = editor
    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }
    editor.insertData = data => {
        const text = data.getData('text/plain')
        const { files } = data
        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')
                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        insertImage(editor, url)
                    })
                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }
    return editor
}
const insertImage = (editor, url) => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
    Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
    })
}
const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}
const InsertImageButton = ({ Icon }) => {
    const editor = useSlateStatic()
    return (
        <MenuButton
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the image:')
                if (url && !isImageUrl(url)) {
                    alert('URL is not an image')
                    return
                }
                url && insertImage(editor, url)
            }}
        >
            {Icon}
        </MenuButton>
    )
}
const Image = ({ attributes, children, element }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)
    const selected = useSelected()
    const focused = useFocused()
    return (
        <div {...attributes}>
            {children}
            <div
                contentEditable={false}
                style={{ position: "relative" }}
            >
                <img
                    src={element.url}
                    style={{
                        display: "block",
                        maxWidth: "100%",
                        maxHeight: "20em",
                        boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none'
                    }}
                />
                <IconButton
                    onClick={(e) => {
                        console.log(e);
                        e.preventDefault();
                        Transforms.removeNodes(editor, { at: path })
                    }}
                    onPointerDown={e=>e.preventDefault()}
                    style={{
                        display: selected && focused ? 'revert-layer' : 'none',
                        position: "absolute",
                        top: "0.5em",
                        left: "0.5em",
                        backgroundColor: "white"
                    }}
                >
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}


export default TextEditor;
export { BlockButton, MarkButton, InsertImageButton }
