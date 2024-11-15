import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import "@/app/lib/zodErrors";
import prisma from '@/utils/db';

async function getUser(username) {
    return (await prisma.user.findFirst({ where: { username } }))
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            id: "login",
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        username: z.string().min(3),
                        password: z.string().min(6)
                    })
                    .parse(credentials);

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
                const parsedCredentials = z
                    .object({
                        username: z.string().min(3),
                        password: z.string().min(6)
                    })
                    .parse(credentials);

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