"use client";

import { usePlotDetails } from "hooks/usePlotDetails";
import _ from "lodash";
import PlottedCard from "components/PlottedCard";
import PlottedCardFocused from "components/PlottedCardFocused";
import { useAuthStore } from "state/auth";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { plotDetails, queryKey } = usePlotDetails(id);
  const { account } = useAuthStore();

  return plotDetails ? (
    <div className="flex flex-col mt-3">
      {<PlottedCardFocused plotDetails={plotDetails} queryKey={queryKey} />}

      {!!account &&
        plotDetails?.replies?.edges?.map((item: any, i: number) => {
          return <PlottedCard key={i} nodeItem={item} queryKey={queryKey} />;
        })}
    </div>
  ) : null;
}
