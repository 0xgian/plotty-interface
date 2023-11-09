import { usePrivateLabels } from "state/privateLabels";
import { Profile } from "./types";
import { useMemo } from "react";

export const useLabel = (profile: Profile) => {
  const { labelByUid } = usePrivateLabels();
  const privLabel = labelByUid(profile?.uid);

  const label = useMemo(
    () => privLabel || toLabel(profile),
    [privLabel, profile]
  );

  return { label, privLabel };
};

export const toLabel = (profile: Profile) =>
  profile?.public_nametag_user_preferance ||
  profile?.public_nametag ||
  profile?.label_center?.name;
