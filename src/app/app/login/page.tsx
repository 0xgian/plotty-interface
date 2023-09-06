"use client";

import { useMemo } from "react";
import { useModal } from "state/modal";

export default function Page() {
  const { isShowing, openModal } = useModal();

  useMemo(() => {
    if (!isShowing("auth")) {
      openModal && openModal("auth");
    }
  }, [isShowing, openModal]);
}
