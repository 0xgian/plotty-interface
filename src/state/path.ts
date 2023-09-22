import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";

interface PathnameStore {
  store: (string | null)[];
  prevPathname: string | null;
  currentPathname: string | null;
}

/** use as a hook to get prevPathname and currentPathname*/
export const usePathHistory = create<PathnameStore>((set, get) => ({
  store: [null],
  prevPathname: null,
  currentPathname: null,
}));

/** use everywhere to ge */
export const getPathname = () => {
  return usePathHistory.getState();
};

/** Only use this in layout or root it's like a Provider */
export const usePathHistoryInitializer = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { store, currentPathname, prevPathname } = usePathHistory();

  useEffect(() => {
    const exactPathname =
      !!pathname && searchParams && searchParams.toString().length > 0
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

    if (!!exactPathname && currentPathname !== exactPathname) {
      const currentStore =
        prevPathname !== null && prevPathname === exactPathname
          ? [...store.slice(0, -1)]
          : [...store, exactPathname];

      usePathHistory.setState((state) => ({
        ...state,
        store: currentStore,
        prevPathname: currentStore[currentStore.length - 2],
        currentPathname: currentStore[currentStore.length - 1],
      }));
    }
  }, [pathname, searchParams, store, currentPathname, prevPathname]);
};
