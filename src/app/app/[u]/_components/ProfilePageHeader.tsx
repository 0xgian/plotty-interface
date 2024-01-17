"use client";

import HeaderPortal from "components/HeaderPortal";
import PageContainer from "components/PageContainer";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { useEffect, useState } from "react";

export default function ProfilePageHeader() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return mounted ? (
    <HeaderPortal>
      <div className="flex flex-col">
        <PageContainer py="pt-6" className="mb-3">
          <ProfileHeader />
        </PageContainer>
        <PageContainer py="py-0" px="px-0">
          <ProfileTabs />
        </PageContainer>
      </div>
    </HeaderPortal>
  ) : null;
}
