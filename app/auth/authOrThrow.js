import { auth } from '@/auth';

export default async function authOrThrow() {
    const session = await auth();
    if (!session)
        throw new Error("You must be signed-in to use this function");
    return session;
}