"use client"

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { useCallback } from 'react';
import {
    Transforms
} from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

const languages = [
    "text",
    "javascript",
    "python",
    "html",
    "css",
    "bash",
    "json",
    "sql",
    "typescript",
    "jsx",
    "tsx"
].sort();

const lastLanguageName = "lastCodeBlock";
function loadLastUsedLanguage() {
    const language = localStorage.getItem(lastLanguageName);
    if (!language)
        return;
    if (languages.includes(language))
        return language
}

export const lastUsedLanguage = {
    value:undefined,
    get() {
        if (!this.value)
            this.value = loadLastUsedLanguage()
        return this.value;
    },
    set(newValue) {
        this.value = newValue;
        localStorage.setItem(lastLanguageName, newValue);
    },
}

const StyledCodeBlock = styled("pre")({
    background: "#f4f4f4",
    padding: "10px",
    borderRadius: "4px",
    "& *": {
        margin: 0
    }
})

export function CodeElementEditor({ attributes, children, element }) {
    const editor = useSlateStatic();
    const language = element.language ?? "text";

    const handleLanguageChange = useCallback((e) => {
        const newLanguage = e.target.value;
        lastUsedLanguage.set(newLanguage);

        const path = ReactEditor.findPath(editor, element)
        const newProperties = {
            language: newLanguage
        }
        Transforms.setNodes(editor, newProperties, {
            at: path,
        })
    }, [editor,element])

    return (
        <div {...attributes}>
            <FormControl sx={{ minWidth: 120 }} size="small" contentEditable={false}>
                <InputLabel id="language">Language</InputLabel>
                <Select
                    labelId="language"
                    id="language"
                    value={language}
                    label="Language"
                    onChange={handleLanguageChange}
                >
                    {languages.map((lang) => (
                        <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <StyledCodeBlock
                {...attributes}
                spellCheck={false}
            >
                <code  >
                    {children}
                </code>
            </StyledCodeBlock>
        </div>
    );
}