import { ironOptions } from "config/iron";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionUserServer } from "state/types";

const isTokenExpired = (token: string) =>
  Date.now() >=
  JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp * 1000;

export async function GET() {
  const session = await getIronSession<SessionUserServer>(
    cookies(),
    ironOptions
  );

  if (!session) {
    return new Response(JSON.stringify({}));
  }

  /** destroy old version session */
  if (!session?.currentAccount && !session?.accounts) {
    session.destroy()
    return new Response(JSON.stringify({}));
  }

  if (
    Object.values(session.accounts).some((account) =>
      isTokenExpired(account.refresh_token)
    )
  ) {
    session.destroy();
    return new Response(JSON.stringify({ needsUpdate: true }));
  }

  const needsUpdate = Object.values(session.accounts).some((account) =>
    isTokenExpired(account.access_token)
  );

  if (needsUpdate) {
    const newTokens = await Promise.all(
      Object.values(session.accounts).map((account) =>
        fetch(`${process.env.NEXT_AUTH_API_URL}/api/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: account.refresh_token }),
        }).then((response) =>
          response.json().then((data) => data.data.access_token)
        )
      )
    );

    session.currentAccount = session.currentAccount;
    session.accounts = Object.values(session.accounts).reduce(
      (memo, account, i) => {
        return {
          ...memo,
          [account.address]: {
            address: account.address,
            access_token: newTokens[i],
            refresh_token: account.refresh_token,
          },
        };
      },
      {}
    );

    await session.save();
  }

  return new Response(
    JSON.stringify({
      currentAccount: session?.currentAccount,
      needsUpdate,
    })
  );
}
