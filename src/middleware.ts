import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith('/colaborador') || req.nextUrl.pathname.startsWith('/gestor')) {
    if (req.cookies.get('nextauth.token') == undefined) {
      return NextResponse.rewrite(new URL('/', req.url))
    }
  }
}
