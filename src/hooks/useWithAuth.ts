import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthStatusStore } from "state/authStatus";

export const useWithAuth = () => {
  const router = useRouter();
  const { account } = useAuthStatusStore();

  const withAuthHandler = useCallback(
    <T extends (...args: any[]) => any>(func: T) => {
      return (...args: Parameters<T>): ReturnType<T> | void => {
        if (!account) {
          router.push("/");
          return;
        }
        return func(...args);
      };
    },
    [account, router]
  );

  return { withAuthHandler };
};
