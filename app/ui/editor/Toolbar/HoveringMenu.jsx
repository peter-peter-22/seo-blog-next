"use client"

import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Editor, Range } from 'slate'
import { useFocused, useSlate } from 'slate-react'
import { MarkButton } from "../components/HandleMarks"
import { ToolbarBackground } from "./Components"

import FormatBold from '@mui/icons-material/FormatBold'
import FormatItalic from '@mui/icons-material/FormatItalic'
import FormatUnderlined from '@mui/icons-material/FormatUnderlined'

export const Portal = ({ children }) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}

export const HoveringMenu = () => {
    const ref = useRef()
    const editor = useSlate()
    const inFocus = useFocused()

    useEffect(() => {
        const el = ref.current
        const { selection } = editor
        if (!el) {
            return
        }
        if (
            !selection ||
            !inFocus ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ''
        ) {
            el.style.opacity = '0'
            el.style.pointerEvents = "none"
            return
        }
        const domSelection = window.getSelection()
        const domRange = domSelection.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()
        el.style.opacity = '1'
        el.style.pointerEvents = "all"
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
        el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`
    })
    return (
        <Portal>
            <Box
                ref={ref}
                sx={theme => ({
                    position: "absolute",
                    opacity: 0,
                    pointerEvents: "none",
                    transition:
                        theme.transitions.create(['opacity'], {
                            duration: theme.transitions.duration.shorter,
                        }),
                })}
            >
                <ToolbarBackground
                    onMouseDown={e => {
                        // prevent toolbar from taking focus away from editor
                        e.preventDefault()
                    }}
                >
                    <MarkButton format="bold" Icon={<FormatBold />} />
                    <MarkButton format="italic" Icon={<FormatItalic />} />
                    <MarkButton format="underline" Icon={<FormatUnderlined />} />
                </ToolbarBackground>
            </Box>
        </Portal>
    )
}  