import { SessionOptions } from "iron-session";

export const ironOptions: SessionOptions = {
  cookieName: "siwessck",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  password: process.env.NEXT_IRON_PASSWORD as string,
};
