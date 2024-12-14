import { auth } from '@/auth'
import { SessionProviderClient } from './SessionProviderClient';

export default async function AuthProvider({ children }) {
    const session = await auth();
    return (
        <SessionProviderClient session={session}>
            {children}
        </SessionProviderClient>
    )
}