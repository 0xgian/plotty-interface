import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "config/iron";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  switch (method) {
    case "GET":
      const address = query?.address ?? "";
      const resFetch = await fetch(`${process.env.NEXT_AUTH_API_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          public_address: address,
        }),
      });
      const json = await resFetch.json();
      res.setHeader("Content-Type", "text/plain");
      // @ts-ignore
      res.send(json.data.message);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
