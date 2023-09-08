import { ironOptions } from "config/iron";
import { getIronSession } from "iron-session/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionUserServer } from "state/types";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const reqSession = await getIronSession(req, res, ironOptions);
  const { pathname, searchParams } = req.nextUrl;
  // @ts-ignore
  const session = reqSession[ironOptions.cookieName] as SessionUserServer;

  let params = "";
  searchParams.forEach((_, key) => {
    params = `${params ? `${params}&` : "?"}${key}=${searchParams.get(key)}`;
  });

  if (!session?.currentAccount) {
    if (pathname.startsWith("/login")) {
      return res;
    }
    return NextResponse.redirect(new URL("/login" + params, req.url));
  }

  if (["/", "/app", "/login"].includes(pathname)) {
    return NextResponse.redirect(new URL("/home" + params, req.url));
  }

  return res;
};

export const config = {
  matcher: [
    "/",
    "/app",
    "/login",
    "/:path*/home",
    "/:path*/search",
    "/:path*/following",
    "/:path*/followers",
  ],
};
