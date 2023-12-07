import { ironOptions } from "config/iron";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { SessionUserServer } from "state/types";

export async function POST(req: NextRequest) {
  const session = await getIronSession<SessionUserServer>(
    cookies(),
    ironOptions
  );

  try {
    const { message, signature, address } = await req.json();
    const resFetch = await fetch(
      `${process.env.NEXT_AUTH_API_URL}/api/authentication`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature }),
      }
    );
    const json = await resFetch.json();

    if (!json.success)
      return new Response(JSON.stringify({ message: "Invalid nonce." }), {
        status: 422,
      });

    session.currentAccount = address;
    session.accounts = {
      [address]: {
        address,
        ...json.data,
      },
    };

    await session.save();
    return new Response(JSON.stringify({ message: "Success" }));
  } catch (_error) {
    return new Response(JSON.stringify({ message: "Error" }), { status: 500 });
  }
}
