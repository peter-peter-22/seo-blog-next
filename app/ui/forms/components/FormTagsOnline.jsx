"use client";

import { getTagsAction } from '@/app/actions/browseActions';
import { useCallback, useMemo, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import FormTags from "./FormTags";

export default function FormTagsOnline(props) {
    const [fullOptions, setFullOptions] = useState([]);
    const options = useMemo(() => fullOptions.map(option => option.name), [fullOptions]);
    const [loading, setLoading] = useState(false);
    const update = useDebouncedCallback(async (value) => {
        setLoading(true);
        const newOptions = await getTagsAction(value);
        setLoading(false);
        setFullOptions(newOptions);
    }, 300);
    const handleChange = useCallback((e) => {
        update(e.target.value);
    }, []);
    return (
        <FormTags
            {...props}
            onInputChange={handleChange}
            options={options}
            loading={loading}
            renderOption={({ key, ...props }, option) => {
                const fullOption = fullOptions.find(fullOption => fullOption.name === option);
                return (
                    <li key={key} {...props}>
                        {option} - {fullOption.count}
                    </li>
                )
            }}
        />
    )
}