"use client";

import { createPortal } from "react-dom";

export default function HeaderPortal({ children }: any) {
  const headerEl =
    typeof document === "object"
      ? document.getElementById("header-layout")
      : null;
  return headerEl ? createPortal(children, headerEl) : null;
}
