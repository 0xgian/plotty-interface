import { ironOptions } from "config/iron";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { message, signature, address } = req.body;
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
          return res.status(422).json({ message: "Invalid nonce." });

        // @ts-ignore
        req.session[ironOptions.cookieName] = {
          currentAccount: address,
          accounts: {
            [address]: {
              address,
              ...json.data,
            },
          },
        };
        await req.session.save();
        res.json({ ok: true });
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
