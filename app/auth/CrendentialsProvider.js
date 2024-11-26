import "@/app/lib/zodErrors";
import { LoginSchema, VerifySchema } from '@/app/ui/forms/schemas/AuthSchema';
import prisma from '@/utils/db';
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';

export const LoginProvider = Credentials({
    id: "login",
    async authorize(credentials) {
        const parsedCredentials = LoginSchema.parse(credentials);
        const { email, password } = parsedCredentials;
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch)
            return;
        return user;
    },
});