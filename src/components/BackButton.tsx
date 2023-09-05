"use client";

import { usePathHistory } from "state/path";
import IconButton from "components/IconButton";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { IconPlotty } from "custom-icons";
import { MENUPATHS } from "components/SidebarApp";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const { prevPathname, currentPathname } = usePathHistory();
  
  return !MENUPATHS.includes(currentPathname ?? "") ? (
    <IconButton
      icon={<HiOutlineArrowLeft size={20} />}
      activeColor="black"
      kind="header"
      onClick={() => (!!prevPathname ? router.back() : router.replace("/home"))}
    />
  ) : currentPathname === "/home" ? (
    <Link
      className="flex items-center cursor-pointer sm:hidden min-w-[30px]"
      href="/app"
    >
      <div className="flex items-center gap-[6px] h-full">
        <IconPlotty size={30} />
      </div>
    </Link>
  ) : null;
}
