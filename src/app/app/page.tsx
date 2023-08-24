"use client";

import { redirect } from "next/navigation";
import { useMemo } from "react";
import { useAuthModal } from "state/authModal";
import { useAuthStatusStore } from "state/authStatus";

export default function Page() {
  const { account } = useAuthStatusStore();
  const { openAuthModal, showAuthModal } = useAuthModal();

  useMemo(() => {
    if (!!account) {
      redirect(`/${account}`);
    } else if (!showAuthModal) {
      openAuthModal && openAuthModal();
    }
  }, [account, showAuthModal, openAuthModal]);
}
