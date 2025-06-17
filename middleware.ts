import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected and public routes
const PROTECTED_ROUTES = ['/home', '/trip'];
const PUBLIC_ROUTES = ['/login'];

export const config = {
    matcher: ['/login', '/home', '/trip'],
};


export default function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const isAuth = !!token;
    const { pathname } = request.nextUrl;

    // 🚫 Authenticated user trying to visit /login → redirect to /home
    if (isAuth && PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    // 🚫 Unauthenticated user trying to visit protected route → redirect to /login
    if (!isAuth && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // ✅ Allow request
    return NextResponse.next();
}
