import { ironOptions } from "config/iron";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionUserServer } from "state/types";
import { Address } from "viem";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  switch (method) {
    case "GET":
      const address = (query?.address as string) ?? "";
      // @ts-ignore
      const session = req.session[ironOptions.cookieName] as SessionUserServer;

      if (!session)
        return res.status(422).json({ message: "Invalid session." });

      const resFetch = await fetch(
        `${process.env.NEXT_AUTH_API_URL}/api/revoke`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              session.accounts[session.currentAccount].access_token
            }`,
          },
          body: JSON.stringify({
            refresh_token:
              session.accounts[session.currentAccount].refresh_token,
          }),
        }
      );
      const json = await resFetch.json();

      if (Object.values(session?.accounts ?? {}).length <= 1) {
        req.session.destroy();
        console.log("after", req.session);
        return res.send({ ok: true });
      }

      const prev = session;
      const nextAccounts = Object.assign({}, prev.accounts);
      delete nextAccounts[address as Address];
      // @ts-ignore
      req.session[ironOptions.cookieName] = {
        currentAccount: Object.keys(nextAccounts).map((key) => key)[0],
        accounts: {
          ...nextAccounts,
        },
      };
      await req.session.save();

      if (!json.success)
        return res.status(422).json({ message: "Invalid token." });

      res.send({ ok: true });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
