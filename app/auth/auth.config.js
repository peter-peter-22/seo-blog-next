export const authConfig = {
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
    jwt({ token, user }) {
      if (user)
        token.user = user;
      return token;
    }
  },
  providers: [], // Add providers with an empty array for now
} 