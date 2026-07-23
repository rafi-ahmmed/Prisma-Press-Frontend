import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtUtils } from './utils/jwt';
import { getRefreshToken } from './service/refreshToken';
import { getSubscriptionStatus } from './app/(publicGroup)/_actions/getSubscriptionStatus';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/', '/news'];

export async function proxy(request: NextRequest) {
   const pathname = request.nextUrl.pathname;
   const storedCookie = await cookies();

   let accessToken = request.cookies.get('accessToken')?.value as string;
   const refreshToken = request.cookies.get('refreshToken')?.value as string;

   const decodedRefreshToken = refreshToken
      ? jwtUtils.verifyToken(
           refreshToken,
           process.env.JWT_REFRESH_SECRET as string
        )
      : null;

   let decodedAccessToken = accessToken
      ? jwtUtils.verifyToken(
           accessToken,
           process.env.JWT_ACCESS_SECRET as string
        )
      : null;

   if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
      console.log('REFRESH-TOKEN request');
      const result = await getRefreshToken();

      if (result.success) {
         const newAccessToken = result.data.accessToken;
         storedCookie.set('accessToken', newAccessToken, {
            maxAge: 60 * 60 * 24,
            sameSite: 'lax',
         });

         accessToken = newAccessToken;
         decodedAccessToken = jwtUtils.verifyToken(
            newAccessToken,
            process.env.JWT_ACCESS_SECRET as string
         );
      }
   }

   let userRole = null;

   if (!decodedAccessToken?.success) {
      storedCookie.delete('accessToken');
   }

   if (decodedAccessToken?.success && decodedAccessToken.data) {
      userRole = (decodedAccessToken.data as JwtPayload).role as string;
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

   //* Stop users to go premium page who was not a subscribe user
   const subscriptionStatus = await getSubscriptionStatus();
   const isActive = Boolean(
      subscriptionStatus?.success && subscriptionStatus?.data?.isSubscribe
   );
   if (pathname === '/premium') {
      const subscriptionStatus = await getSubscriptionStatus();
      const isActive = Boolean(
         subscriptionStatus?.success && subscriptionStatus?.data?.isSubscribe
      );

      if (!isActive) {
         return NextResponse.redirect(new URL('/payment', request.url));
      }
   }

   //* Stop users to go payment page who are already subscribed user
   // if (pathname === '/payment') {
   //    if (isActive) {
   //       return NextResponse.redirect(new URL('/premium', request.url));
   //    }
   // }






   return NextResponse.next();
}

export const config = {
   matcher: [
      // '/dashboard/:path*', '/admin-dashboard/:path*'

      '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
   ],
};
