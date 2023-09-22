import { getAPI } from "lib/getAPI";
import { useQuery } from "wagmi";
import { useAuthStore } from "state/auth";

export const useProfileSuggestions = () => {
  const { session, account } = useAuthStore();

  const token = account && session?.accounts?.[account]?.access_token;

  const { data: profileSuggestions } = useQuery(
    ["profileSuggestions", !!token],
    async () => {
      if (!!token) {
        const res = await fetch(getAPI(`/api/user-suggestion`), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        const list = json?.data?.data;
        return list;
      }
      return null;
    }
  );

  return { profileSuggestions };
};
