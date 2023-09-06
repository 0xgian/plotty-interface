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
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineUser,
  HiSearch,
  HiUser,
} from "react-icons/hi";
import { RiTwitterFill, RiDiscordFill } from "react-icons/ri";
import { useAuthStore } from "state/auth";
import Button from "components/Button";
import { usePlotModal } from "state/plotModal";
import { IconPlotty } from "custom-icons";
import { isIOS, isMobileOnly } from "react-device-detect";
import { rippleEffect } from "lib/touchEffect";
import { usePathHistory } from "state/path";

export default function SidebarApp({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname() as string;
  const { currentPathname } = usePathHistory();
  const { account } = useAuthStore();
  const { openPlotModal } = usePlotModal();

  const safeAreaBottom =
    isIOS &&
    isMobileOnly &&
    window.matchMedia("(display-mode: standalone)").matches
      ? "12px"
      : "0px";

  const filteredMenus = SIDEMENUS.filter((m) =>
    m.authRequired ? !!account : true
  );

  const show = MENUPATHS.includes(currentPathname ?? "");

  return (
    <>
      <div
        className={clsx(
          "pr-0 sm:pr-3 flex-col gap-6 justify-between bg-white select-none",
          "w-full sm:w-auto lg:w-[255px] sm:h-[100dvh] fixed bottom-0 sm:sticky sm:top-0 z-[1]",
          "border-secondary-text border-opacity-10 border-t sm:border-t-0 sm:border-r",
          show ? "flex" : "hidden sm:flex"
        )}
        style={{ paddingBottom: safeAreaBottom }}
      >
        <div className="flex flex-row justify-around w-full gap-1 leading-snug sm:flex-col">
          <Link
            className="hidden h-[60px] cursor-pointer sm:flex items-center pl-6"
            href="/"
          >
            <div className="flex items-center gap-[6px] h-full">
              <IconPlotty size={30} />
            </div>
          </Link>
          {filteredMenus.map((menu, i) => {
            const active =
              menu.path === "/"
                ? pathname.toLowerCase() === `/${account?.toLowerCase()}`
                : pathname === menu.path;
            return (
              <div key={i} className="flex items-center w-full gap-2">
                <div
                  className={clsx(
                    "hidden sm:block min-w-[4px] h-7 rounded-r-full",
                    active && "bg-primary"
                  )}
                />
                <Link
                  href={menu.path}
                  onClick={rippleEffect}
                  className={clsx(
                    "flex items-center justify-center lg:justify-start gap-3 py-4 sm:py-3 lg:p-3",
                    "screen-hover:hover:bg-secondary-text screen-hover:hover:bg-opacity-10 transition-all",
                    "sm:rounded-full w-full relative overflow-hidden",
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
                </Link>
              </div>
            );
          })}

          {account && (
            <Button
              className={clsx(
                "hidden sm:flex min-w-0 ml-3 mt-3 aspect-square lg:aspect-auto h-12"
              )}
              px="px-0"
              kind="primary"
              onClick={() => openPlotModal()}
            >
              <span className="hidden lg:block">New Plot</span>
              <HiOutlinePlus className="lg:hidden" size={24} />
            </Button>
          )}
        </div>

        <div className="items-center justify-between hidden w-full p-3 pl-6 text-secondary-text sm:flex">
          <div className="hidden text-xs lg:block">Find us on</div>
          <div className="flex flex-col items-center gap-3 mx-auto lg:mx-0 lg:flex-row">
            <Link href="https://twitter.com/PlottyFi" target="_blank">
              <RiTwitterFill />
            </Link>
            <Link href="https://discord.gg/dG2dPpCUKE" target="_blank">
              <RiDiscordFill />
            </Link>
          </div>
        </div>
      </div>

      {account && (
        <Button
          className={clsx(
            "min-w-0 aspect-square fixed sm:hidden right-4 h-14 sm:h-12 z-[1]"
          )}
          style={{ bottom: `calc(${show ? 72 : 18}px + ${safeAreaBottom})` }}
          px="px-0"
          kind="primary"
          onClick={() => openPlotModal()}
        >
          <HiOutlinePlus size={24} />
        </Button>
      )}
    </>
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
  {
    title: "Search",
    icon: <HiOutlineSearch size={24} />,
    activeIcon: <HiSearch size={24} />,
    path: "/search",
    authRequired: true,
  },
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
    path: "/",
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

export const MENUPATHS = [
  ...SIDEMENUS.map((menu) => menu.path),
  "/home?version=1",
];
