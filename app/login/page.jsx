"use client";

import { useActionState } from 'react';
import { login } from '../lib/authActions';
import { useSearchParams } from 'next/navigation'

export default function Page() {
    const searchParams = useSearchParams()
    const redirect = searchParams.get("callbackUrl") || "/profile";

    const [errorState, formAction, isPending] = useActionState(
        login,
    );

    return (
        <form action={formAction}  >
            {errorState?.message && <p>{errorState.message}</p>}
            <input type="hidden" name="redirectTo" value={redirect} />
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