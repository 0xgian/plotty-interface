import { useAuthStore } from "state/auth";
import { getAPI } from "lib/getAPI";
import { useQuery } from "wagmi";
import { useMemo } from "react";
import { usePlotFeedbackStore } from "state/plotFeedback";

export const usePlotDetails = (plotId?: string) => {
  const { session, account } = useAuthStore();
  const { syncFeedback } = usePlotFeedbackStore();

  const token = session?.accounts?.[account ?? "0x0"]?.access_token;

  const queryKey = useMemo(() => ["plot", plotId, !!token], [plotId, token]);

  const { data: plotDetails } = useQuery(queryKey, async () => {
    if (typeof plotId !== "undefined") {
      const res = await fetch(
        getAPI(`/api/post/${plotId}`),
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {}
      );
      const json = await res.json();
      syncFeedback([{ node: json.data?.data?.post }]);
      return json?.data?.data?.post;
    }
    return null;
  });

  return { plotDetails, queryKey };
};
