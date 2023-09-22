import { create } from "zustand";
import { useAuthStore } from "state/auth";
import { useEffect } from "react";
import { getAPI } from "lib/getAPI";

interface PrivateLabels {
  [uid: number]: string;
}

interface PrivateLabelsStore {
  labels: PrivateLabels;
  labelByUid: (uid?: number) => string | undefined;
  updateLabelByUid: (uid: number, label: string) => void;
}

export const usePrivateLabels = create<PrivateLabelsStore>((set, get) => ({
  labels: {},
  labelByUid: (uid) => (uid ? get().labels[uid] : undefined),
  updateLabelByUid: (uid, label) =>
    set({ labels: { ...get().labels, [uid]: label } }),
}));

export const usePrivateLabelsInitializer = () => {
  const { session, account } = useAuthStore();

  useEffect(() => {
    const getPrivateLabels = async () => {
      const res = await fetch(getAPI("/api/user/nametag/private"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      const privateLabels = json.data.reduce(
        (memo: PrivateLabels, item: any) => {
          return { ...memo, [item.for_uid]: item.nametag };
        },
        {}
      );

      usePrivateLabels.setState((state) => ({
        ...state,
        labels: privateLabels,
      }));
    };

    const token = account && session?.accounts?.[account]?.access_token;
    if (!token) return;

    !!token && getPrivateLabels();
  }, [session, account]);
};
