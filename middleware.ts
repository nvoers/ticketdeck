// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(req: NextRequest) {
//   // Get the pathname of the request (e.g. /, /protected)
//   const path = req.nextUrl.pathname;

//   const session = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   // If it's the root path, just render it
//   if (path === "/" && session) {
//     return NextResponse.redirect(new URL("/protected", req.url));
//   } else if (path === "/") {
//     return NextResponse.next();
//   }

//   if (!session && path === "/protected") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   } else if (session && (path === "/login" || path === "/register")) {
//     return NextResponse.redirect(new URL("/protected", req.url));
//   }
//   return NextResponse.next();
// }


import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 