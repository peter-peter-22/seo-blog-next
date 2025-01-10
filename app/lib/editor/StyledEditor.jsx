'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import {
    PlateContent,
    useEditorContainerRef,
    useEditorRef,
} from '@udecode/plate-common/react';
import Card from '@mui/material/Card';

export const EditorContainer = ({
    variant,
    ...props
}) => {
    const editor = useEditorRef();
    const containerRef = useEditorContainerRef();

    return (
        <div
            id={editor.uid}
            ref={containerRef}
            {...props}
        />
    );
};

const StyledPlateContent = styled(PlateContent)({
    fontFamily: "var(--font-roboto)",
    outline: "none",
    minHeight: "100vh !important",
})

export const Editor = React.forwardRef(
    (props, ref) => {
        return (
            <Card
                sx={theme => ({
                    m: 10,
                    p: 1,
                    //borderRadius: 1,
                    //borderStyle: "solid",
                    //borderColor: theme.palette.primary.light,
                    transition: theme.transitions.create(['all'], {
                        duration: theme.transitions.duration.shorter,
                    })
                })}
            //style={{
            //    ...focused && { borderColor: "transparent" }
            //}}
            >
                <StyledPlateContent
                    ref={ref}
                    {...props}
                />
            </Card >
        );
    }
);

Editor.displayName="Editor"