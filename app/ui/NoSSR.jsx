'use client';

import React from "react";
export default function NoSSR({ children }) {
    const [ok, setOk] = React.useState(false);
    React.useEffect(() => {
        setOk(true);
    }, [])
    return ok && children;
}