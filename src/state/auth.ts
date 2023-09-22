import { create } from "zustand";
import { SessionUser } from "state/types";
import { Address } from "viem";
import { useEffect } from "react";

interface AuthStore {
  account?: Address;
  session?: SessionUser;
  setSession: (session?: SessionUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  account: undefined,
  session: undefined,
  setSession: (session) =>
    set({ session: session, account: session?.currentAccount }),
  logout: () => set({ session: undefined, account: undefined }),
}));

export const useSessionInitializer = (sessionUser?: SessionUser) => {
  const { setSession } = useAuthStore();

  useEffect(() => {
    setSession(sessionUser);
  }, [sessionUser, setSession]);
};
