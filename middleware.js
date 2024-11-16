import NextAuth from 'next-auth';
import { authConfig } from './app/auth/auth.config';

export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/profile/:path*'],
};