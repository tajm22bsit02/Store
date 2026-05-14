import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { demoUsers } from "@/lib/data";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = demoUsers.find(
          (item) => item.email === credentials.email && item.password === credentials.password
        );
        if (!user) return null;
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
