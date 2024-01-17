"use client";

import clsx from "clsx";
import BrandLoading from "components/BrandLoading";
import { useModal } from "state/modal";

export default function BrandLoadingOverlay() {
  const { isShowing } = useModal();
  return isShowing("loading") ? (
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center w-full h-screen",
        "bg-primary-text bg-opacity-25 z-[2]"
      )}
    >
      <div className="p-4 bg-primary-white rounded-xl">
        <BrandLoading />
      </div>
    </div>
  ) : null;
}
