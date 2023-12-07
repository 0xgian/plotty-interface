import { cookies } from "next/headers";
import SessionInitializer from "./SessionInitializer";
import { getIronSession } from "iron-session";
import { ironOptions } from "config/iron";
import { SessionUserServer, susToSu } from "state/types";

async function getSessionUser() {
  const session = await getIronSession<SessionUserServer>(
    cookies(),
    ironOptions
  );
  if (!session?.currentAccount) {
    return undefined;
  }
  return susToSu(session);
}

export default async function UserInitializer() {
  const sessionUser = await getSessionUser();
  return <SessionInitializer sessionUser={sessionUser} />;
}
