export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      //const isLoggedIn = !!auth?.user;
      return false;
    },
  },
  providers: [], // Add providers with an empty array for now
} 