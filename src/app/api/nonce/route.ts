import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address)
    return new Response(JSON.stringify({ message: "Invalid address." }), {
      status: 422,
    });

  const resFetch = await fetch(`${process.env.NEXT_AUTH_API_URL}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      public_address: address,
    }),
  });

  const json = await resFetch.json();
  return new Response(JSON.stringify({ nonce: json.data.message }));
}
