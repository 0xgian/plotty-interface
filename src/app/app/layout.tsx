import NavbarApp from "components/NavbarApp";
import SidebarApp from "components/SidebarApp";
import { Providers } from "components/Providers";
import "@rainbow-me/rainbowkit/styles.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <section>
        <NavbarApp />
        <div className="flex h-full">
          <SidebarApp />
          <div className="w-full sm:w-[calc(100vw-73px)] lg:w-[calc(100vw-255px)] px-6">
            <div className="max-w-[930px] mx-auto py-6">{children}</div>
          </div>
        </div>
      </section>
    </Providers>
  );
}
