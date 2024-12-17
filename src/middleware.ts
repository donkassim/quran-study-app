import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const surahMatch = pathname.match(/^\/surah\/(\d+)$/);

  if (surahMatch) {
    const surahId = parseInt(surahMatch[1], 10);
    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/surah/:id*",
};
