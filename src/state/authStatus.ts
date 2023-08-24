import { create } from "zustand";
import { SessionUser } from "./types";
import { Address } from "viem";

interface AuthStatusStoreState {
  account?: Address;
  session?: SessionUser;
  setSession: (session?: SessionUser) => void;
  logout: () => void;
}

export const useAuthStatusStore = create<AuthStatusStoreState>((set, get) => ({
  account: undefined,
  session: undefined,
  setSession: (session?: SessionUser) =>
    set({ session: session, account: session?.currentAccount }),
  logout: () => set({ session: undefined, account: undefined }),
}));
