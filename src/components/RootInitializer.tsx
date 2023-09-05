"use client";

import { usePathHistoryInitializer } from "state/path";
import BrandLoadingOverlay from "components/BrandLoadingOverlay";
import Toaster from "components/Toaster";

export default function RootInitializer() {
  usePathHistoryInitializer();
  return (
    <>
      <BrandLoadingOverlay />
      <Toaster />
    </>
  );
}
