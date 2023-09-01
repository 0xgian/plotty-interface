"use client";

import { redirect } from "next/navigation";
import { useMemo } from "react";
import { useModal } from "state/modal";
import { useAuthStore } from "state/auth";

export default function Page() {
  const { account } = useAuthStore();
  const { isShowing, openModal } = useModal();

  useMemo(() => {
    if (!!account) {
      redirect(`/${account}`);
    } else if (!isShowing("auth")) {
      openModal && openModal("auth");
    }
  }, [account, isShowing, openModal]);
}
