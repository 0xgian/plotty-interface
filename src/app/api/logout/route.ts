import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { ironOptions } from "config/iron";
import { SessionUserServer } from "state/types";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const address = searchParams.get("address");

  const session = await getIronSession<SessionUserServer>(
    cookies(),
    ironOptions
  );

  if (!session)
    return new Response(JSON.stringify({ message: "Invalid session." }), {
      status: 422,
    });

  const resFetch = await fetch(`${process.env.NEXT_AUTH_API_URL}/api/revoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        session.accounts[session.currentAccount].access_token
      }`,
    },
    body: JSON.stringify({
      refresh_token: session.accounts[session.currentAccount].refresh_token,
    }),
  });
  const json = await resFetch.json();

  if (Object.values(session?.accounts ?? {}).length <= 1) {
    session.destroy();
  } else {
    const prev = session;
    const nextAccounts = Object.assign({}, prev.accounts);
    delete nextAccounts[address as Address];

    session.currentAccount = Object.keys(nextAccounts).map(
      (key) => key as `0x${string}`
    )[0];
    session.accounts = {
      ...nextAccounts,
    };

    await session.save();
  }

  if (!json.success)
    return new Response(JSON.stringify({ message: "Invalid token." }), {
      status: 422,
    });

  return new Response(JSON.stringify({ message: "Success" }));
}
