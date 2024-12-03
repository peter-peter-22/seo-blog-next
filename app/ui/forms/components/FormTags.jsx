"use client";

import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useCallback, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function FormTags({ name, options = [], label, ...props }) {
    const { control, formState: { errors } } = useFormContext();
    const myError = errors[name]?.message;
    return (
        <Controller
            name={name}
            id={name}
            control={control}
            render={({ field: { value, onChange, ...field } }) => {
                const handleChange = useCallback((_, value) => {
                    onChange(value);
                }, []);
                return <Autocomplete
                    multiple
                    id={name}
                    options={options}
                    freeSolo
                    {...props}
                    value={value ?? []}
                    onChange={handleChange}
                    {...field}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip variant="outlined" size='small' label={option} key={key} {...tagProps} />
                            );
                        })
                    }
                    renderInput={(params) => (
                        < TextField
                            {...params}
                            label={label}
                            error={!!myError}
                            helperText={myError}
                        />
                    )}
                />
            }}
        />
    )
}