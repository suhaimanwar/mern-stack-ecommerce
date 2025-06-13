/* eslint-disable @typescript-eslint/no-unused-vars */

import { Api } from "@/api/Api";
import { NextAuthOptions } from "next-auth";

// import jwt from "jsonwebtoken"

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  }, 
  jwt: { 
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({ 
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      id: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const response = await Api.loginUser({
          email: credentials?.email,
          password: credentials?.password,
        });

        // console.log("responsee:::", response);

        if (!response.success) {
          throw new Error(response.message);
        // } else {
        //   console.log("response.message::::", response.message);
        //   console.log("response.userData:::::", response.userData);
        }

        return response.userData;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.accessToken = user.userAccessToken;
      }
      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.email = token.email ?? "";
        session.accessToken = token.accessToken;
      }
      // console.log("SESSION:::::", session);
      return session;
    },
  },
};
