"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiBell,
  HiDotsCircleHorizontal,
  HiGlobe,
  HiHome,
  HiOutlineBell,
  HiOutlineDotsCircleHorizontal,
  HiOutlineGlobe,
  HiOutlineHome,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi";
import { RiQuillPenLine } from "react-icons/ri";
import { IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";
import { useAuthStatusStore } from "state/authStatus";
import Button from "components/Button";
import { usePlotModal } from "state/plotModal";
import { IconPlotty } from "custom-icons";

export default function SidebarApp({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname() as string;
  const { account } = useAuthStatusStore();
  const { openPlotModal } = usePlotModal();

  return (
    <div
      className={clsx(
        "pr-3 border-secondary-text border-opacity-10 flex flex-col gap-6 justify-between",
        "w-full sm:w-auto lg:w-[255px] sm:h-[100dvh] fixed bottom-0 sm:sticky sm:top-0 z-[1]",
        "border-t sm:border-t-0 sm:border-r bg-white select-none"
      )}
    >
      <div className="flex flex-row justify-around w-full gap-1 leading-snug sm:flex-col">
        <Link
          className="hidden h-[60px] cursor-pointer sm:flex items-center pl-6"
          href="/app"
        >
          <div className="flex items-center gap-[6px] h-full">
            <IconPlotty size={30} />
          </div>
        </Link>
        {SIDEMENUS.filter((m) => (m.authRequired ? !!account : true)).map(
          (menu, i) => {
            const active =
              menu.path === "/app"
                ? pathname.toLowerCase() === `/${account?.toLowerCase()}`
                : pathname === menu.path;
            return (
              <Link
                key={i}
                href={menu.path}
                className="flex items-center gap-2 sm:w-full"
              >
                <div
                  className={clsx(
                    "hidden sm:block min-w-[4px] h-7 rounded-r-full",
                    active && "bg-primary"
                  )}
                />
                <div
                  className={clsx(
                    "flex items-center justify-center lg:justify-start gap-3 py-4 sm:py-3 lg:p-3",
                    "sm:hover:bg-secondary-text sm:hover:bg-opacity-10 transition-all",
                    "rounded-xl sm:rounded-full cursor-pointer w-full",
                    active && "font-semibold"
                  )}
                >
                  {active ? menu.activeIcon : menu.icon}
                  <div
                    className={clsx(
                      "hidden text-lg lg:flex items-center",
                      active ? "font-semibold" : "font-medium"
                    )}
                  >
                    {menu.title}
                  </div>
                </div>
              </Link>
            );
          }
        )}

        {account && (
          <Button
            className={clsx(
              "min-w-0 sm:ml-3 sm:mt-3 aspect-square lg:aspect-auto",
              "absolute sm:static bottom-[72px] right-4 h-14 sm:h-12"
            )}
            px="px-0"
            kind="primary"
            onClick={() => openPlotModal()}
          >
            <span className="hidden lg:block">New Plot</span>
            <RiQuillPenLine className="lg:hidden" size={24} />
          </Button>
        )}
      </div>

      <div className="items-center justify-between hidden w-full p-3 pl-6 text-secondary-text sm:flex">
        <div className="hidden text-xs lg:block">Find us on</div>
        <div className="flex flex-col items-center gap-3 mx-auto lg:mx-0 lg:flex-row">
          <Link href="https://twitter.com/PlottyFi" target="_blank">
            <IoLogoTwitter />
          </Link>
          <Link href="https://discord.gg/dG2dPpCUKE" target="_blank">
            <IoLogoDiscord />
          </Link>
        </div>
      </div>
    </div>
  );
}

const SIDEMENUS = [
  {
    title: "Home",
    icon: <HiOutlineHome size={24} />,
    activeIcon: <HiHome size={24} />,
    path: "/home",
    authRequired: true,
  },
  // {
  //   title: "Explore",
  //   icon: <HiOutlineGlobe size={24} />,
  //   activeIcon: <HiGlobe size={24} />,
  //   path: "/explore",
  //   authRequired: true,
  // },
  // {
  //   title: "Notifications",
  //   icon: <HiOutlineBell size={24} />,
  //   activeIcon: <HiBell size={24} />,
  //   path: "/notifications",
  //   authRequired: true,
  // },
  {
    title: "Profile",
    icon: <HiOutlineUser size={24} />,
    activeIcon: <HiUser size={24} />,
    path: "/app",
    authRequired: true,
  },
  {
    title: "More",
    icon: <HiOutlineDotsCircleHorizontal size={24} />,
    activeIcon: <HiDotsCircleHorizontal size={24} />,
    path: "/more",
    authRequired: false,
  },
];
