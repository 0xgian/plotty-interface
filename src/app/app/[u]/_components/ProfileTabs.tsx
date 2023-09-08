"use client";

import Tabs from "components/Tabs";
import { useWithAuth } from "hooks/useWithAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ProfileTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const username = params?.["u"] as string;
  const { withAuthHandler } = useWithAuth();

  const [tab, setTab] = useState("Plots");

  useEffect(() => {
    const end = pathname?.split("/")[2];
    switch (end) {
      case "following":
        setTab("Following");
        break;

      case "followers":
        setTab("Followers");
        break;

      default:
        setTab("Plots");
        break;
    }
  }, [pathname]);

  const changeTap = withAuthHandler(
    useCallback(
      (tab: string) => {
        switch (tab) {
          case "Following":
            router.push(`/${username}/following`);
            break;

          case "Followers":
            router.push(`/${username}/followers`);
            break;

          default:
            router.push(`/${username}`);
            break;
        }
        setTab(tab);
      },
      [router, username]
    )
  );

  return (
    <Tabs
      selected={tab}
      onSelect={changeTap}
      tabs={["Plots", "Following", "Followers"]}
      tabClassName="max-w-[930px] mx-auto"
    />
  );
}