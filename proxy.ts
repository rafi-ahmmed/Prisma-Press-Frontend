import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/refreshToken';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/', '/news'];

export async function proxy(request: NextRequest) {
   const pathname = request.nextUrl.pathname;
   const storedCookie = await cookies();

   const refreshToken = request.cookies.get('refreshToken')?.value as string;
   let accessToken = request.cookies.get('accessToken')?.value as string;

   const decodedAccessToken = accessToken
      ? jwtUtils.verifyToken(
           accessToken,
           process.env.JWT_ACCESS_SECRET as string
        )
      : null;

   const decodedRefreshToken = refreshToken
      ? jwtUtils.verifyToken(
           refreshToken,
           process.env.JWT_REFRESH_SECRET as string
        )
      : null;

   if (decodedRefreshToken?.success && !decodedAccessToken?.success) {
      const result = await getNewAccessToken();

      if (result.success && result.data) {
         const newAccessToken = result.data.accessToken;

         storedCookie.set('accessToken', newAccessToken, {
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
         });

         accessToken = newAccessToken.data.accessToken;
      }
   }

   if (!decodedAccessToken?.success) {
      // Cookie is expired or invalid, try to refresh the token
      storedCookie.delete('accessToken');
      // return NextResponse.redirect(new URL('/login', request.url));
   }

   let userRole = null;

   if (decodedAccessToken?.success && decodedAccessToken.data) {
      userRole = (decodedAccessToken.data as JwtPayload).role;
   }

   // * stop user from accessing login and register page if they are already logged in
   if (accessToken && AUTH_ROUTES.includes(pathname)) {
      if (userRole === 'USER') {
         return NextResponse.redirect(new URL('/dashboard', request.url));
      } else if (userRole === 'ADMIN') {
         return NextResponse.redirect(new URL('/admin-dashboard', request.url));
      } else if (userRole === 'AUTHOR') {
         return NextResponse.redirect(
            new URL('/author-dashboard', request.url)
         );
      } else {
         return NextResponse.redirect(new URL('/', request.url));
      }
   }

   // * Role-based access control for dashboard routes
   const isPublicRoute = PUBLIC_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + '/')
   );

   const isAuthRoute = AUTH_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + '/')
   );

   if (!accessToken && !isPublicRoute && !isAuthRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
   }

   if (pathname.startsWith('/dashboard') && userRole !== 'USER') {
      return NextResponse.redirect(new URL('/not-found', request.url));
   } else if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/not-found', request.url));
   } else if (
      pathname.startsWith('/author-dashboard') &&
      userRole !== 'AUTHOR'
   ) {
      return NextResponse.redirect(new URL('/not-found', request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      // '/dashboard/:path*', '/admin-dashboard/:path*'

      '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
   ],
};
