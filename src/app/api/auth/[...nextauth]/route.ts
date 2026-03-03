import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const result = await pool.query(
          "SELECT * FROM admins WHERE email = $1",
          [credentials?.email]
        );

        if (!result.rows.length) return null;

        const user = result.rows[0];

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id ,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // ✅ important for TS
  },
  callbacks: {
   // JWT callback
 // JWT callback
async jwt(params: any): Promise<JWT & { role?: string; id?: string }> {
  const { token, user } = params;
  if (user) {
    token.role = (user as any).role;
    token.id = String((user as any).id);
  }
  return token;
},

  // Session callback
  async session({
    session,
    token,
  }: {
    session: Session & { user?: { role?: string; id?: number } };
    token: JWT & { role?: string; id?: number };
  }): Promise<Session & { user: { role?: string; id?: number } }> {
    if (session.user) {
      session.user.role = token.role ?? "unknown";
      session.user.id = token.id ?? 0;
    }
    return session as Session & { user: { role?: string; id?: number } };
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };