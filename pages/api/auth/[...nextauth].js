import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import AppleProvider from 'next-auth/providers/apple';
import GoogleProvider from 'next-auth/providers/google';

import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/auth/mongodb';

// import type { NextAuthOptions } from 'next-auth';

export const authOptions = {
  // Adapter is the database connection.
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    // https://next-auth.js.org/providers/email
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // // https://next-auth.js.org/providers/apple
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // // https://next-auth.js.org/providers/google
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
  ],
  // Configure other options
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code
    logo: 'http://crypto.hezik.nl/GetKendyLogo.png', // Absolute URL to image
    buttonText: '', // Hex color code
  },
};
export default NextAuth(authOptions);