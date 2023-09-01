import {
  AuthenticationStatus,
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from "@rainbow-me/rainbowkit";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuthStore } from "state/auth";
import { useModal } from "state/modal";
import { useAccount } from "wagmi";

export interface AuthContextProps {
  children: ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const fetchingStatusRef = useRef(false);
  const verifyingRef = useRef(false);
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>("loading");
  const { logout, account } = useAuthStore();
  const { address } = useAccount();

  const { openModal, closeModal } = useModal();

  const wrappedOnLogIn = useCallback(() => {
    setAuthStatus("authenticated");
  }, []);

  const wrappedOnLogOut = useCallback(() => {
    setAuthStatus("unauthenticated");
    logout();
  }, [logout]);

  // Fetch user when:
  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) {
        return;
      }

      fetchingStatusRef.current = true;

      try {
        const response = await fetch("/api/me");
        const json = await response.json();
        if (json.needsUpdate) {
          window.location.reload();
          return;
        }
        json.currentAccount ? wrappedOnLogIn() : wrappedOnLogOut();
      } catch (_error) {
        wrappedOnLogOut();
      } finally {
        fetchingStatusRef.current = false;
      }
    };

    // 1. page loads
    fetchStatus();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", fetchStatus);
    return () => window.removeEventListener("focus", fetchStatus);
  }, [wrappedOnLogIn, wrappedOnLogOut]);

  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetch(`/api/nonce?address=${address}`);
        return await response.text();
      },

      createMessage: ({ nonce, address, chainId }) => {
        const message = nonce;
        return message;
      },

      getMessageBody: ({ message }) => {
        return message;
      },

      verify: async ({ message, signature }) => {
        verifyingRef.current = true;

        try {
          const response = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, signature, address }),
          });

          const authenticated = Boolean(response.ok);

          if (authenticated) {
            window.location.reload();
          }

          return authenticated;
        } catch (error) {
          return false;
        } finally {
          verifyingRef.current = false;
        }
      },

      signOut: async () => {
        try {
          openModal("loading");
          await fetch(`/api/logout?address=${account}`);
        } finally {
          closeModal();
          wrappedOnLogOut();
          window.location.reload();
        }
      },
    });
  }, [address, wrappedOnLogOut, account, openModal, closeModal]);

  return (
    <RainbowKitAuthenticationProvider adapter={authAdapter} status={authStatus}>
      {children}
    </RainbowKitAuthenticationProvider>
  );
}
