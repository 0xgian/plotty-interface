import { ironOptions } from "config/iron";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionUserServer } from "state/types";

const isTokenExpired = (token: string) =>
  Date.now() >=
  JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp * 1000;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      // @ts-ignore
      const session = req.session[ironOptions.cookieName] as SessionUserServer;
      if (!session) return res.send({});

      if (
        Object.values(session.accounts).some((account) =>
          isTokenExpired(account.refresh_token)
        )
      ) {
        req.session.destroy();
        return res.send({});
      }

      if (
        Object.values(session.accounts).some((account) =>
          isTokenExpired(account.access_token)
        )
      ) {
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
        // @ts-ignore
        req.session[ironOptions.cookieName] = {
          currentAccount: session.currentAccount,
          accounts: Object.values(session.accounts).reduce(
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
          ),
        };
        await req.session.save();
      }

      res.send({
        currentAccount: session?.currentAccount,
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
