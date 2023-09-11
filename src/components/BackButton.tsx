"use client";

import IconButton from "components/IconButton";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { IconPlotty } from "custom-icons";
import { MENUPATHS } from "components/SidebarApp";
import { useGoBack } from "hooks/useGoBack";

export default function BackButton() {
  const { goBack, currentPathname } = useGoBack();

  return !MENUPATHS.includes(currentPathname ?? "") ? (
    <IconButton
      icon={<HiOutlineArrowLeft size={20} />}
      activeColor="black"
      kind="header"
      onClick={goBack}
    />
  ) : currentPathname?.startsWith("/home") ? (
    <Link
      className="flex items-center cursor-pointer sm:hidden min-w-[30px]"
      href="/"
    >
      <div className="flex items-center gap-[6px] h-full">
        <IconPlotty size={30} />
      </div>
    </Link>
  ) : null;
}
