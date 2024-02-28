import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@lib/db";
import * as bcrypt from "bcryptjs";

const credentialsOptions = {
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

          if (userFound) {
            return {
              id: userFound.id,
              name: userFound.name,
              email: userFound.email,
            };
          }
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(credentialsOptions);

export { handler as GET, handler as POST };
