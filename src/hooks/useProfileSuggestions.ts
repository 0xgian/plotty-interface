import { getAPI } from "lib/getAPI";
import { useQuery } from "wagmi";
import { useAuthStatusStore } from "state/authStatus";

export const useProfileSuggestions = () => {
  const { session, account } = useAuthStatusStore();

  const token = session?.accounts?.[account ?? "0x0"]?.access_token;

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