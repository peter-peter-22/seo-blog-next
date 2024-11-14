"use server";

import { signIn } from '@/auth';

export async function login(
    prevState,
    formData
) {
    try {
        await signIn('login', formData);
    }
    catch (err) {
        switch (err.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
        }
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
        switch (err.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return formatErrorMessage(err.cause.err);
        }
    }
}

function formatErrorMessage(err) {
    if (err.name === "ZodError")
        return { message: "At least one field is invalid.", zodErrors: err.flatten().fieldErrors }
    return { message: err.toString() };
}