import { LoginProvider, RegisterProvider } from '@/app/auth/CrendentialsProvider';
import "@/app/lib/zodErrors";
import { authConfig } from '@/app/auth/auth.config';
import NextAuth from 'next-auth';
import Github from "next-auth/providers/github";

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        LoginProvider,
        RegisterProvider,
        Github
    ],
});