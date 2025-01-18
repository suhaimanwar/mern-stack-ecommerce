import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token != undefined,
  },
});

export const config = { matcher: ["/:path*"] };