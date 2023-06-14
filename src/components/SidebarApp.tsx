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
import { IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";
import { useAccount } from "wagmi";

export default function SidebarApp({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const { address } = useAccount();

  return (
    <div
      className={clsx(
        "px-3 border-secondary-text border-opacity-10 flex flex-col gap-6 justify-between",
        "w-full sm:w-auto lg:w-[255px] sm:h-[calc(100vh-61px)] fixed bottom-0 sm:relative",
        "border-t sm:border-r"
      )}
    >
      <div className="flex flex-row justify-around w-full gap-1 leading-6 sm:flex-col sm:mt-3 font-display">
        {SIDEMENUS.map((menu, i) => {
          const active =
            menu.path === "/"
              ? pathname.toLowerCase() === `/${address?.toLowerCase()}`
              : pathname === menu.path;
          return (
            <Link
              key={i}
              href={menu.path}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-xl cursor-pointer",
                "sm:hover:bg-secondary-text sm:hover:bg-opacity-10",
                active ? "text-main-purple" : "text-secondary-text"
              )}
            >
              {active ? menu.activeIcon : menu.icon}
              <div className="hidden text-lg font-medium lg:block">
                {menu.title}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="items-center justify-between hidden w-full p-3 text-secondary-text sm:flex">
        <div className="hidden text-xs lg:block">Find us on</div>
        <div className="flex flex-col items-center gap-3 mx-auto lg:mx-0 lg:flex-row">
          <Link href="https://twitter.com/PlottyFi" target="_blank">
            <IoLogoTwitter />
          </Link>
          <Link href="https://discord.gg/XCsmNxgcPP" target="_blank">
            <IoLogoDiscord />
          </Link>
        </div>
      </div>
    </div>
  );
}

const SIDEMENUS = [
  // {
  //   title: "Home",
  //   icon: <HiOutlineHome size={24} />,
  //   activeIcon: <HiHome size={24} />,
  //   path: "/home",
  // },
  // {
  //   title: "Explore",
  //   icon: <HiOutlineGlobe size={24} />,
  //   activeIcon: <HiGlobe size={24} />,
  //   path: "/explore",
  // },
  // {
  //   title: "Notifications",
  //   icon: <HiOutlineBell size={24} />,
  //   activeIcon: <HiBell size={24} />,
  //   path: "/notifications",
  // },
  {
    title: "Profile",
    icon: <HiOutlineUser size={24} />,
    activeIcon: <HiUser size={24} />,
    path: "/",
  },
  {
    title: "More",
    icon: <HiOutlineDotsCircleHorizontal size={24} />,
    activeIcon: <HiDotsCircleHorizontal size={24} />,
    path: "/more",
  },
];
