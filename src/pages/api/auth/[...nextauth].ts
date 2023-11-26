// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import nodemailer from "nodemailer";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import path from "path";

import analytics from "~/utils/analytics";

const signInSuccess = () => {
  analytics.track("Signed_In", {
    category: "User",
    label: "Signed In",
  });
};

const registrationSuccess = () => {
  analytics.track("New_Regestration", {
    category: "User",
    label: "New Registration",
  });
};

export default NextAuth({
  pages: {
    // signIn: "/dashboard",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // DiscordProvider({
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET,
    // }),
    // EmailProvider({
    //   maxAge: 10 * 60,
    //   sendVerificationRequest,
    // }),
    // GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  // events: { createUser: sendWelcomeEmail },
  callbacks: {
    async signIn(user, account, profile) {
      signInSuccess();
      return true;
    },
    async session({ session, token, user }) {
      // add user id to session
      session.user.id = user.id;
      return session;
    },
    async createUser(user) {
      registrationSuccess();
      return user;
    },
  },

  session: {
    jwt: true,
  },
  jwt: {
    secret: "dmfnlskdjfneafjrnwesdfovsdfbskdfs",
    maxAge: 7 * 24 * 60 * 60, // 1 week
  },
});


// closer {
//   user: {
//     name: 'run ethio',
//     email: 'runethioprinting@gmail.com',
//     image: 'https://lh3.googleusercontent.com/a/ACg8ocJ8ROn8wufMvPR8Qmyjtqv8jKEQBhBYY6-hignhdjFc=s96-c',
//     id: 'clo3g34e30000vat4d9rpzciy'
//   },
//   expires: '2023-11-22T22:24:33.306Z'
// }


// personal {
//   user: {
//     id: 'clo2xbvsh0001vab4x7g6jwkr',
//     name: null,
//     email: 'toygame88@gmail.com',
//     image: null
//   },
//   expires: 2023-10-30T22:16:48.675Z
// }