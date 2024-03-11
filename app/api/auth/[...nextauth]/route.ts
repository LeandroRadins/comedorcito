/* import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@lib/db";
import * as bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { User } from "@prisma/client";

const credentialsOptions = {
  providers: [
    
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({token, user}: {token: JWT; user: User} ) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({session, token}: {session: any; token: JWT}) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
};

const handler = NextAuth(credentialsOptions);

export { handler as GET, handler as POST }; */

import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };