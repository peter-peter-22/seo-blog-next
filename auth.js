import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import "@/app/lib/zodErrors";
import prisma from '@/utils/db';
import { LoginSchema, RegisterSchema } from '@/app/ui/forms/schemas/AuthSchema';

async function getUser(username) {
    return (await prisma.user.findFirst({ where: { username } }))
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            id: "login",
            async authorize(credentials) {
                const parsedCredentials = LoginSchema.parse(credentials);

                const { username, password } = parsedCredentials;
                const user = await getUser(username);
                if (!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password_hash);
                if (passwordsMatch) return user;

                return null;
            },
        }),
        Credentials({
            id: "register",
            async authorize(credentials) {
                const parsedCredentials = RegisterSchema.parse(credentials);

                const { username, password } = parsedCredentials;
                const newUser = await prisma.user.create({
                    data: {
                        username,
                        password_hash: bcrypt.hashSync(password, 10),
                    }
                });
                return newUser;
            },
        }),
    ],
});