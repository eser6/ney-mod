// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const session = request.cookies.get("next-auth.session-token");

//   const protectedRoutes = [
//     "/dashboard",
//     "/tool-email",
//     "/tool-proposal",
//     "/tool-igcaption",
//     "/tool-brandkit",
//     "/tool-landingpage"
//   ];

//   const isProtected = protectedRoutes.some((path) =>
//     request.nextUrl.pathname.startsWith(path)
//   );

//   if (isProtected && !session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }
