import { ReactNode } from "react";
import NavbarApp from "components/NavbarApp";
import SidebarApp from "components/SidebarApp";
import "@rainbow-me/rainbowkit/styles.css";
import FetchSessionUser from "components/FetchSessionUser";
import Providers from "components/Providers";
import PageContainer from "components/PageContainer";
import ProfileSuggestions from "components/ProfileSuggestions";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <FetchSessionUser />
      <Providers>
        <section className="flex h-full">
          <SidebarApp />
          <div className="mb-[100dvh]">
            <NavbarApp />
            <div id="header-layout" className="flex flex-col-reverse">
              <PageContainer py="pt-0" px="lg:px-4">
                <div className="flex gap-[30px]">
                  <div className="w-full max-w-[600px]">{children}</div>
                  <div className="hidden w-full max-w-[300px] lg:block relative">
                    <ProfileSuggestions />
                  </div>
                </div>
              </PageContainer>
            </div>
          </div>
        </section>
      </Providers>
    </>
  );
}
