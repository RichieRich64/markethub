import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as supabaseHelpers from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = (supabaseHelpers as any).createMiddlewareClient({
    req,
    res,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
