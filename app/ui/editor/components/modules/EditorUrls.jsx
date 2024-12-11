"use client";

import TextDialog from '@/app/ui/dialogs/TextDialog';
import Link from '@mui/material/Link';
import { isKeyHotkey } from 'is-hotkey';
import isUrl from 'is-url';
import { useCallback, useMemo, useState } from 'react';
import {
    Editor,
    Range,
    Element as SlateElement,
    Transforms
} from 'slate';
import { useReadOnly, useSelected, useSlate } from 'slate-react';
import { z } from 'zod';
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
    const { insertData, insertText, isInline } =
        editor
    editor.isInline = element =>
        ['link'].includes(element.type) || isInline(element)
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
            insertData(data)//pass the insert to the next
        }
    }
    return editor
}
const insertLink = (editor, url) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}
const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
}
const unwrapLink = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
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

    //prevent the link from opening in edit mode
    const isReadonly = useReadOnly();
    const handleClick = useCallback(e => {
        if (!isReadonly)
            e.preventDefault();
    }, [isReadonly])

    return (
        <Link
            {...attributes}
            href={safeUrl}
            sx={{
                boxShadow: selected && "0 0 0 3px #ddd",
            }}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
        >
            <InlineChromiumBugfix />
            {children}
            <InlineChromiumBugfix />
        </Link>
    )
}
export const AddLinkButton = ({ Icon }) => {
    const editor = useSlate()
    const processUrl = useCallback((url) => {
        if (!url)
            return;
        insertLink(editor, url);
        closeDialog();
    }, [])

    const [dialogOpen, setDialogOpen] = useState(false);
    const closeDialog = useCallback(() => {
        setDialogOpen(false)
    }, [])
    const validation = useMemo(() => z.string().url(), [])
    return (
        <>
            <MenuButton
                onMouseDown={event => {
                    event.preventDefault()
                    setDialogOpen(true);
                }}
            >
                {Icon}
            </MenuButton>
            <TextDialog
                open={dialogOpen}
                title="Enter the URL of the image"
                textFieldProps={{
                    label: "Url",
                    placeholder: "https://github.com",
                    id: "linkUrl"
                }}
                confirmText="Add"
                callback={processUrl}
                onClose={closeDialog}
                validation={validation}
            />
        </>
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