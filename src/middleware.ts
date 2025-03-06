import { NextRequest, NextResponse } from "next/server"
import * as jose from 'jose'

export function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.startsWith('/api')) 
  {
    const token = request.headers.get('Authorization');
    if (!token) return NextResponse.json({ message: 'Akses ditolak token tidak ditemukan', code: 401 }, { status: 401 });

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      jose.jwtVerify(token, secret);
      return NextResponse.next()
    } catch (error) {
      return NextResponse.json({ message: 'Token tidak valid', code: 403 }, { status: 403 });
    }
  }
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|images).*)'],
}