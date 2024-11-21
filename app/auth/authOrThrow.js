import { auth } from '@/auth';

export default async function authOrThrow() {
    const session = await auth();
    if (!session)
        throw new Error("Unauthorized");
    return session;
}