import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import NaverProvider from "next-auth/providers/naver";
import Credentials from "@auth/core/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/app/lib/db";

interface Credentials {
  email: string;
  password: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const creds = credentials as Credentials;
        if (!creds?.email || !creds?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: creds.email },
          include: { Password: true },
        });

        if (!user || !user.Password) {
          return null;
        }

        const isValid = await compare(creds.password, user.Password.hash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
    GithubProvider,
    NaverProvider,
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          provider: token.provider,
        },
      };
    },

    async signIn({ user }) {
      if (!user) {
        return false; // 로그인 실패
      }
      return true; // 로그인 성공
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
});
