import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthStore } from "state/auth";

export const useWithAuth = () => {
  const router = useRouter();
  const { account } = useAuthStore();

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
