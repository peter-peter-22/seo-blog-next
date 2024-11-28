"use client";

import Link from '@mui/material/Link';
import { isKeyHotkey } from 'is-hotkey';
import isUrl from 'is-url';
import { useMemo } from 'react';
import {
    Editor,
    Range,
    Element as SlateElement,
    Transforms
} from 'slate';
import { useSelected, useSlate } from 'slate-react';
import { MenuButton } from '../../EditorUI';

export const onKeyDown = (event, editor) => {
    const { selection } = editor
    // Default left/right behavior is unit:'character'.
    // This fails to distinguish between two cursor positions, such as
    // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
    // Here we modify the behavior to unit:'offset'.
    // This lets the user step into and out of the inline without stepping over characters.
    // You may wish to customize this further to only use unit:'offset' in specific cases.
    if (selection && Range.isCollapsed(selection)) {
        const { nativeEvent } = event
        if (isKeyHotkey('left', nativeEvent)) {
            event.preventDefault()
            Transforms.move(editor, { unit: 'offset', reverse: true })
            return
        }
        if (isKeyHotkey('right', nativeEvent)) {
            event.preventDefault()
            Transforms.move(editor, { unit: 'offset' })
            return
        }
    }
}

export const withInlines = editor => {
    const { insertData, insertText, isInline, isElementReadOnly, isSelectable } =
        editor
    editor.isInline = element =>
        ['link', 'button', 'badge'].includes(element.type) || isInline(element)
    editor.isElementReadOnly = element =>
        element.type === 'badge' || isElementReadOnly(element)
    editor.isSelectable = element =>
        element.type !== 'badge' && isSelectable(element)
    editor.insertText = text => {
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }
    editor.insertData = data => {
        const text = data.getData('text/plain')
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }
    return editor
}
const insertLink = (editor, url) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}
const insertButton = editor => {
    if (editor.selection) {
        wrapButton(editor)
    }
}
const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
}
const isButtonActive = editor => {
    const [button] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'button',
    })
    return !!button
}
const unwrapLink = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
}
const unwrapButton = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'button',
    })
}
const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }
    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }
    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}
const wrapButton = editor => {
    if (isButtonActive(editor)) {
        unwrapButton(editor)
    }
    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const button = {
        type: 'button',
        children: isCollapsed ? [{ text: 'Edit me!' }] : [],
    }
    if (isCollapsed) {
        Transforms.insertNodes(editor, button)
    } else {
        Transforms.wrapNodes(editor, button, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}
// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
    <span
        contentEditable={false}
        style={{
            fontSize: 0
        }}
    >
        {String.fromCodePoint(160) /* Non-breaking space */}
    </span>
)

const allowedSchemes = ['http:', 'https:', 'mailto:', 'tel:']
export const LinkComponent = ({ attributes, children, element }) => {
    const selected = useSelected()
    const safeUrl = useMemo(() => {
        let parsedUrl = null
        try {
            parsedUrl = new URL(element.url)
            // eslint-disable-next-line no-empty
        } catch { }
        if (parsedUrl && allowedSchemes.includes(parsedUrl.protocol)) {
            return parsedUrl.href
        }
        return 'about:blank'
    }, [element.url])
    return (
        <Link
            {...attributes}
            href={safeUrl}
            sx={{
                boxShadow: selected && "0 0 0 3px #ddd",
            }}
        >
            <InlineChromiumBugfix />
            {children}
            <InlineChromiumBugfix />
        </Link>
    )
}
export const EditableButtonComponent = ({ attributes, children }) => {
    return (
        /*
          Note that this is not a true button, but a span with button-like CSS.
          True buttons are display:inline-block, but Chrome and Safari
          have a bad bug with display:inline-block inside contenteditable:
          - https://bugs.webkit.org/show_bug.cgi?id=105898
          - https://bugs.chromium.org/p/chromium/issues/detail?id=1088403
          Worse, one cannot override the display property: https://github.com/w3c/csswg-drafts/issues/3226
          The only current workaround is to emulate the appearance of a display:inline button using CSS.
        */
        <span
            {...attributes}
            onClick={ev => ev.preventDefault()}
            // Margin is necessary to clearly show the cursor adjacent to the button
            style={{
                margin: "0 0.1em",
                backgroundColor: "#efefef",
                padding: "2px 6px",
                border: "1px solid #767676",
                borderRadius: 2,
                fontSize: "0.9em"
            }}
        >
            <InlineChromiumBugfix />
            {children}
            <InlineChromiumBugfix />
        </span>
    )
}
export const BadgeComponent = ({ attributes, children, element }) => {
    const selected = useSelected()
    return (
        <span
            {...attributes}
            contentEditable={false}
            style={{
                backgroundColor: "green",
                color: "white",
                padding: "2px 6px",
                borderRadius: 2,
                fontSize: "0.9em",
                boxShadow: selected && "0 0 0 3px #ddd"
            }}
            data-playwright-selected={selected}
        >
            <InlineChromiumBugfix />
            {children}
            <InlineChromiumBugfix />
        </span>
    )
}
export const AddLinkButton = ({ Icon }) => {
    const editor = useSlate()
    return (
        <MenuButton
            active={isLinkActive(editor)}
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the link:')
                if (!url) return
                insertLink(editor, url)
            }}
        >
            {Icon}
        </MenuButton>
    )
}
export const RemoveLinkButton = ({ Icon }) => {
    const editor = useSlate()
    return (
        <MenuButton
            active={isLinkActive(editor)}
            onMouseDown={event => {
                if (isLinkActive(editor)) {
                    unwrapLink(editor)
                }
            }}
        >
            {Icon}
        </MenuButton>
    )
}
const ToggleEditableButtonButton = () => {
    const editor = useSlate()
    return (
        <Button
            active
            onMouseDown={event => {
                event.preventDefault()
                if (isButtonActive(editor)) {
                    unwrapButton(editor)
                } else {
                    insertButton(editor)
                }
            }}
        >
            <Icon>smart_button</Icon>
        </Button>
    )
}
