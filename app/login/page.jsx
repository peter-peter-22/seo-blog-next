"use client";

import { useActionState } from 'react';
import { login, register } from '../lib/authActions';

export default function Page() {
    const [errorState, formAction, isPending] = useActionState(
        register,
        undefined,
    );

    console.log(errorState?.zodErrors);

    return (
        <form action={formAction}>
            {errorState?.message && <p>{errorState.message}</p>}
            <input
                type="text"
                name="username"
            />
            {errorState?.zodErrors?.username && <p>{errorState.zodErrors.username}</p>}
            <input
                type="password"
                name="password"
            />
            <button type="submit" disabled={isPending}>submit</button>
            {errorState?.zodErrors?.password && <p>{errorState.zodErrors.password}</p>}
        </form>
    );
}