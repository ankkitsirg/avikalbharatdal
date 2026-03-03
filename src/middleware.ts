import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // redirect to this page if not logged in
  },
});

export const config = {
  matcher: ["/admin/:path*", "/api/members/:path*"],
};