import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
console.log("AUTH_SECRET length:", process.env.AUTH_SECRET?.length);
console.log("AUTH_URL:", process.env.AUTH_URL);

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true, // Enable debug mode for more verbose server logs
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM,
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
    async signIn({ user }) {
      console.log("SignIn callback for:", user.email);
      if (!user.email) return false;
      
      const adminEmails = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) || [];
      const isAdmin = adminEmails.includes(user.email.toLowerCase());
      console.log("Is Admin:", isAdmin);
      return true; 
    },
    async jwt({ token, user }) {
      console.log("JWT callback. User present:", !!user);
      if (user) {
        const adminEmails = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) || [];
        token.role = adminEmails.includes(user.email?.toLowerCase() || "") ? "ADMIN" : "USER";
        console.log("Assigned role to token:", token.role);
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback. Token role:", token.role);
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
})
