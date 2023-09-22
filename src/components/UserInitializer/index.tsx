import { getRequestCookie } from "lib/getRequestCookie";
import { cookies } from "next/headers";
import SessionInitializer from "./SessionInitializer";

async function getSessionUser() {
  const sessionUser = await getRequestCookie(cookies());
  return sessionUser;
}

export default async function UserInitializer() {
  const sessionUser = await getSessionUser();
  return <SessionInitializer sessionUser={sessionUser} />;
}
