import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { usePathHistory } from "state/path";

export const useGoBack = () => {
  const router = useRouter();
  const { prevPathname, currentPathname } = usePathHistory();

  const goBack = useCallback(() => {
    !!prevPathname ? router.back() : router.replace("/home");
  }, [prevPathname, router]);

  return { goBack, prevPathname, currentPathname };
};
