"use client"

import React, { useCallback, useEffect } from "react";
import { useDebouncedCallback } from 'use-debounce';

export function loadDraft(updating) {
    const defaultValue = {
        title: "",
        description: "",
        content: "",
        tags: []
    }
    return { ...defaultValue, ...getLocalValue(updating) }
}

function getLocalValue(updating) {
    try {
        return typeof window !== 'undefined' && JSON.parse(localStorage.getItem(getDraftName(updating)));
    } catch (err) {
        console.error("error while parsing draft", err)
        return {};
    }
}

export function getDraftName(updating) {
    return updating ? 'updateDraft' : 'draft';
}

export function getDraft({ updating }) {
    return React.useMemo(() => loadDraft(updating), [updating]);
}

export function useDraft({ updating, disabled }) {
    const debounced = useDebouncedCallback(
        (values) => {
            localStorage.setItem(getDraftName(updating), JSON.stringify(values));
        },
        500
    );

    //cancel the delayed save when disabled
    useEffect(() => {
        if (!disabled)
            return;
        debounced.cancel();
    }, [disabled, debounced]);

    const save = useCallback((values) => {
        debounced(values);
    }, [updating])

    return {save};
}