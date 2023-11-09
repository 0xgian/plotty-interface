import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { getAddress, isAddress } from "viem";
import { useMutation, useQuery, useQueryClient } from "wagmi";
import { useMemo } from "react";
import { Profile } from "./types";

export const useProfile = (param: string | undefined) => {
  const { session, account } = useAuthStore();
  const queryClient = useQueryClient();

  const token = account && session?.accounts?.[account]?.access_token;

  const queryKey = useMemo(() => ["profile", param, !!token], [param, token]);

  const { data: profileData } = useQuery(queryKey, async () => {
    if (param) {
      const res = await fetch(
        isAddress(param)
          ? getAPI(`/api/page?public_address=${param}`)
          : getAPI(`/api/page?handle=${param}`),
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {}
      );
      let json = await res.json();

      if (!json?.data?.data?.profile && isAddress(param)) {
        await fetch(getAPI(`/api/search?people=${getAddress(param)}`));
        const res = await fetch(getAPI(`/api/page?public_address=${param}`));
        json = await res.json();
      }

      return json.data?.data?.profile;
    }
    return null;
  });

  const { mutateAsync: updateProfile } = useMutation(
    async (bio: string) => {
      if (token) {
        let formData = new FormData();
        bio === ""
          ? formData.append("reset[]", "bio")
          : formData.append("bio", bio);

        const res = await fetch(getAPI(`/api/user/profile`), {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (res.status == 200) {
          return res.json();
        }

        throw new Error("Can't update profile.");
      }

      throw new Error("Invalid token.");
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile", param]);
      },
    }
  );

  if (!profileData) {
    return {
      profile: undefined,
    };
  }

  return {
    updateProfile,
    profile: profileData as Profile,
    queryKey,
  };
};
