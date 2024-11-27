import { LoginProvider } from '@/app/auth/CrendentialsProvider';
import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        LoginProvider,
        GithubProvider({
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            allowDangerousEmailAccountLinking: true,
        })
    ],
});