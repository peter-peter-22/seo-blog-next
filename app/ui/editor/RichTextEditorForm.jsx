import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import RichTextEditor from "./RichTextEditor";
import Alert from '@mui/material/Alert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { PlateEditor } from "@/components/editor/plate-editor";

export default function RichTextEditorForm({ name, onChange }) {
    const { control, formState: { errors } } = useFormContext();
    const myError = errors[name]?.message;
    return (
        <>
            <Controller
                control={control}
                name={name}
                onChange={onChange}
                render={({ field }) => {
                    const { value, onChange } = field;
                    return <RichTextEditorMemo
                        value={value ?? fallbackValue}
                        onChange={onChange}
                    />
                }}
            />
            {myError &&
                <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error" sx={{ mt: 2 }}>
                    {myError}
                </Alert>
            }
        </>
    )
}

//the rich text editor cannot be controlled. register it as controlled to make it compatible with react hook form
const RichTextEditorMemo = memo(PlateEditor, (prev, next) => prev.error === next.error);

const fallbackValue = [];