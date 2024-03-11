import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider, {DiscordProfile} from "next-auth/providers/discord";
import db from "@lib/db";
import * as bcrypt from "bcryptjs";
import { env } from "process";

const prismaAdapter = () => {
  return PrismaAdapter(db) as Adapter;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}
export const authOptions: NextAuthOptions = {
  adapter: prismaAdapter(),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@email.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "**********",
        },
      },
      
      async authorize(credentials) {
        if (credentials) {
          const userFound = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!userFound) throw new Error("user not found");

          const matchPassword = await bcrypt.compare(
            credentials.password,
            userFound.password
          );

          if (!matchPassword) throw new Error("password not match");

          // Create session and store it in the database
          /* if (prismaAdapter) {
            const session = await prismaAdapter()?.createSession({
              sessionToken: userFound.email + userFound.id,
              userId: userFound.id,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            });
            if (!session) throw new Error("Failed to create session");
          } else {
            throw new Error("PrismaAdapter is not initialized properly");
          } */

          return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
          };
        }
        return null;
      },
    }),
    DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID ?? "",
        clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
        profile(profile: DiscordProfile) {
          console.log(profile)
          return {
              ...profile,
              role: profile.role ?? "user",
              id: profile.id.toString(),
              image: profile.avatar_url,
          }
      },
      }),
  ],
  
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      //asdsa
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        email: token.email,
      },
    }),
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
