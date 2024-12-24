import "@/app/lib/zodErrors";
import { LoginSchema } from '@/app/ui/forms/schemas/AuthSchema';
import prisma from '@/utils/db';
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';

export const LoginProvider = Credentials({
    id: "login",
    async authorize(credentials) {
        const parsedCredentials = LoginSchema.parse(credentials);
        const { email, password } = parsedCredentials;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        if (!user.password)
            throw new Error("This email address has no password registered.")
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch)
            return;
        return user;
    },
});