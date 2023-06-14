import clsx from "clsx";
import Link from "next/link";
import { IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import Image from "next/image";

export default function Page() {
  return (
    <div
      className={clsx("flex flex-col gap-6 justify-between w-full h-full")}
    >
      <div className="flex flex-col w-full gap-1 mb-6 font-display">
        <div className="mb-6 text-[20px] font-bold">More</div>
        {MOREMENUS.map((menu, i) => {
          return (
            <Link
              key={i}
              href={menu.path}
              target={menu.newtab ? "_blank" : ""}
              className={clsx("flex items-center gap-3 justify-between")}
            >
              <div className="flex items-center gap-3 text-lg font-medium sm:gap-6">
                <div
                  style={{
                    filter:
                      "invert(75%) sepia(9%) saturate(402%) hue-rotate(195deg) brightness(77%) contrast(87%)",
                  }}
                >
                  {menu.icon}
                </div>
                {menu.title}
              </div>
              <div className="text-secondary-text">
                <HiOutlineChevronRight size={24} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-between w-full text-secondary-text sm:hidden">
        <div className="text-xs">Find us on</div>
        <div className="flex items-center gap-3">
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

const MOREMENUS = [
  {
    title: "Leaderboard",
    icon: (
      <Image
        priority
        src="/images/icons/icon-ranking.svg"
        height={24}
        width={24}
        alt="ranking-icon"
      />
    ),
    path: "https://zealy.io/c/plottyfi/leaderboard",
    newtab: true,
  },
];
