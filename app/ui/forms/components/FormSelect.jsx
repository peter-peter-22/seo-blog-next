"use client";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Controller, useFormContext } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';

export default function FormSelect({ name, children, Label, sx, hasNone, ...props }) {
    const { control, formState: { errors } } = useFormContext();
    const myError = errors[name]?.message;

    return (
        <FormControl
            variant={"standard"}
            sx={{ minWidth: 120, ...sx }}
            {...props}
        >
            <InputLabel id={name}>{Label}</InputLabel>
            <Controller
                name={name}
                id={name}
                control={control}
                render={({ field: { value, ...field } }) => (
                    <Select
                        labelId={name}
                        value={value ?? ""}//prevent the "changing uncontrolled to controlled error"
                        {...field}
                        error={!!myError}
                    >
                        {hasNone &&
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                        }
                        {children}
                    </Select>
                )}
            />
            {myError && <FormHelperText error={true}>{myError}</FormHelperText>}
        </FormControl>
    )
}