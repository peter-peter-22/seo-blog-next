import "@/app/lib/zodErrors";
import { LoginSchema, RegisterSchema } from '@/app/ui/forms/schemas/AuthSchema';
import prisma from '@/utils/db';
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';

export const LoginProvider = Credentials({
    id: "login",
    async authorize(credentials) {
        const parsedCredentials = LoginSchema.parse(credentials);

        const { username, password } = parsedCredentials;
        const user = await prisma.user.findFirst({ where: { username } });
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordsMatch)
            return;
        return user;
    },
});

export const RegisterProvider = Credentials({
    id: "register",
    async authorize(credentials) {
        const parsedCredentials = RegisterSchema.parse(credentials);

        const { username, password } = parsedCredentials;
        const newUser = await prisma.user.create({
            data: {
                username,
                passwordHash: bcrypt.hashSync(password, 10),
            }
        });
        return newUser;
    },
});