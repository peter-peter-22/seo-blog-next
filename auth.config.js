import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./utils/db";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/signIn',
    newUser: "/profile/newUser"
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      // Include token data in the session object if needed
      session.user = token.user;
      return session;
    },
    jwt({ token, user, trigger, session }) {
      // Attach user data to the JWT when they sign in
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }

      //update the user when session.update is called on the client
      //change only the safe values
      if (trigger === "update") {
        token.user = {
          ...token.user,
          name: session.name,
          image:session.image
        }
      }
      return token;
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  providers: [], // Add providers with an empty array for now
}