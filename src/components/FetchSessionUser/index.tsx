import { getRequestCookie } from "lib/getRequestCookie";
import { cookies, headers } from "next/dist/client/components/headers";
import SetSessionUser from "./SetSessionUser";
import { redirect } from "next/navigation";

async function getSessionUser() {
  const sessionUser = await getRequestCookie(cookies());
  return sessionUser;
}

export default async function FetchSessionUser() {
  const sessionUser = await getSessionUser();

  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");
  // const activeUrl = headersList.get("referer");
  // const activeHost = headersList.get("host");

  if (!sessionUser?.currentAccount) {
    const pathKeys = activePath?.split("/");
    const pathKey = pathKeys?.[3] || pathKeys?.[2];
    console.log(activePath, pathKeys, pathKey);
    if (!!pathKey) {
      if (["home", "search", "following", "followers"].includes(pathKey))
        redirect("/");
    }
  }

  return <SetSessionUser sessionUser={sessionUser} />;
}
