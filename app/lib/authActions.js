"use server";

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

export async function login(
    prevState,
    formData
) {
    try {
        await signIn('login', formData);
    }
    catch (err) {
        return handleAuthError(err);
    }
}

export async function register(
    prevState,
    formData
) {
    try {
        await signIn('register', formData);
    }
    catch (err) {
        return handleAuthError(err);
    }
}

export async function signOutAction() {
    try {
        await signOut();
    }
    catch (err) {
        return handleAuthError(err);
    }
}
function handleAuthError(err) {
    if (err instanceof AuthError) {
        switch (err.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            case "CallbackRouteError":
                return formatErrorMessage(err.cause?.err);
            default:
                return "Something went wrong";
        }
    }
    console.log("REDIRECT:\n",err.digest);
    throw err;//make redirect work
}

function formatErrorMessage(err) {
    if (err.name === "ZodError")
        return { message: "At least one field is invalid.", zodErrors: err.flatten().fieldErrors }
    return { message: err.toString() };
}