import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn();
    } 
    if (auth.userId && req.nextUrl.pathname === "/") {
      const mytickets = new URL('/mytickets', req.url)
      return NextResponse.redirect(mytickets);
    }
    return NextResponse.next();
  },
  // publicRoutes: ["/", "/api/webhooks(.*)", "/api/(.*)"],
  publicRoutes: ["/", "/api/webhooks(.*)"],
  apiRoutes: ["/api(.*)"],
  ignoredRoutes: ['/api/webhooks'],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 