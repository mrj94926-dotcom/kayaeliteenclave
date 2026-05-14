import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { isAdmin } from "@/lib/isAdmin"
import { sql } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;
      
      const role = isAdmin(user.email) ? "ADMIN" : "USER";
      
      try {
        // Sync user with database
        await sql`
          INSERT INTO users (id, name, email, image, role)
          VALUES (${user.id || ""}, ${user.name || ""}, ${user.email}, ${user.image || ""}, ${role})
          ON CONFLICT (email) 
          DO UPDATE SET 
            name = EXCLUDED.name, 
            image = EXCLUDED.image,
            role = EXCLUDED.role
        `;
        return true;
      } catch (error) {
        console.error("Error saving user to DB:", error);
        return true; // Still allow login even if DB sync fails
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = isAdmin(user.email) ? "ADMIN" : "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
})
