"use client";

import { useCallback, useState } from "react";
import FormTags from "./FormTags";
import { useDebouncedCallback } from 'use-debounce';

export default function FormTagsOnline({ fetch, ...props }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const update = useDebouncedCallback(async (value) => {
        setLoading(true);
        const newOptions = await fetch(value);
        setLoading(false);
        setOptions(newOptions);
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
        />
    )
}