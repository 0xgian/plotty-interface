"use client";

import { usePlotDetails } from "hooks/usePlotDetails";
import _ from "lodash";
import PlottedCard from "components/PlottedCard";
import PlottedCardFocused from "components/PlottedCardFocused";
import { useAuthStore } from "state/auth";
import { usePrevious } from "hooks/usePrevious";
import { useEffect } from "react";
import { useGoBack } from "hooks/useGoBack";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { goBack } = useGoBack();
  const { account } = useAuthStore();

  const { plotDetails, queryKey } = usePlotDetails(id);
  const prevPlotDetails = usePrevious(plotDetails);

  useEffect(() => {
    if (prevPlotDetails && !plotDetails) {
      goBack();
    }
  }, [prevPlotDetails, plotDetails, goBack]);

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
