import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './app/lib/auth'

export async function middleware(req: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const path = req.nextUrl.pathname; // /login, /dashboard

  // 보호할 경로들
  const protectedPaths = ['/dashboard', '/bookmark'];
  const isProtectedPath = protectedPaths.some(protectedPath =>
    path.startsWith(protectedPath)
  );

  // 로그인 페이지
  const isAuthPage = path === '/login';

  // 1. 로그인된 사용자가 로그인 페이지 접근 시 대시보드로
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 2. 비로그인 사용자가 보호된 경로 접근 시 로그인 페이지로
  if (isProtectedPath && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(path);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/bookmark',
    '/bookmark/:path*',
    '/login'
  ]
};