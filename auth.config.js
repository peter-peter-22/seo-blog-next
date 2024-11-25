import prisma from '@/utils/db';

export const authConfig = {
  pages: {
    signIn: '/auth/signIn',
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    session({ session, token }) {
      //add the user from the token to the session
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      //if the account value is defined, then this callback was called after signing-in
      const newSignIn = !!account;

      if (!newSignIn)
        return token;

      //find or create an user in the db, return the whole user object
      const userData = await handleSignIn(user, account, profile);

      //filter secrets from the user object what will be visible on the client
      const { username, id, created } = userData;
      const filteredUser = {
        username,
        id,
        created
      }

      console.log("\n\nSIGNED IN\n\n", filteredUser);

      //add the custom user object the token
      token.user = filteredUser;
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
}

async function handleSignIn(user, account, profile) {
  const { provider } = account;

  if (provider === "login" || provider === "register") {
    //the crendentials providers handle the database actions
    return user;
  }
  else if (provider === "google") {
    const { email, name } = profile;
    const existing = await prisma.user.findFirst({ where: { gmail: email } });
    if (existing)
      return existing;
    const created = await prisma.user.create({
      data: {
        username: name,
        gmail: email
      }
    });
    return created;
  }
  else if (provider === "github") {
    const { id, name } = profile;
    const existing = await prisma.user.findFirst({ where: { githubId: id } });
    if (existing)
      return existing;
    const created = await prisma.user.create({
      data: {
        username: name,
        githubId: id
      }
    });
    return created;
  }
}