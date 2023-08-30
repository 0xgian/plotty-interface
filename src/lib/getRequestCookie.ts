import { ironOptions } from "config/iron";
import { unsealData } from "iron-session";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { SessionUser, SessionUserServer, susToSu } from "state/types";

/**
 * Can be called in page/layout server component.
 * @param cookies ReadonlyRequestCookies
 * @returns SessionUser or undefined
 */
export async function getRequestCookie(
  cookies: ReadonlyRequestCookies
): Promise<SessionUser | undefined> {
  const cookieName = ironOptions.cookieName;
  const found = cookies.get(cookieName);

  if (!found) return undefined;

  const ck = await unsealData(found.value, {
    password: process.env.NEXT_IRON_PASSWORD as string,
  });
  console.log("getRequestCookie", ck);

  return susToSu(ck[cookieName] as SessionUserServer);
}
