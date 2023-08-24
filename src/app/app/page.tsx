"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAuthModal } from "state/authModal";
import { useAuthStatusStore } from "state/authStatus";

export default function Page() {
  const { account } = useAuthStatusStore();
  const { openAuthModal, showAuthModal } = useAuthModal();

  useEffect(() => {
    console.log(8888, "/");
    if (account) {
      console.log(9999, "/");
      redirect(`/${account}`);
    } else if (!showAuthModal) {
      openAuthModal && openAuthModal();
    }
  }, [account, showAuthModal, openAuthModal]);
}
