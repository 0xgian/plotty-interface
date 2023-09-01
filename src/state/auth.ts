import { create } from "zustand";
import { SessionUser } from "./types";
import { Address } from "viem";

interface AuthStoreState {
  account?: Address;
  session?: SessionUser;
  setSession: (session?: SessionUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  account: undefined,
  session: undefined,
  setSession: (session?: SessionUser) =>
    set({ session: session, account: session?.currentAccount }),
  logout: () => set({ session: undefined, account: undefined }),
}));
