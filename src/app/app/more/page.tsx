import clsx from "clsx";
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";
import { BiBarChartAlt2 } from "react-icons/bi";
import { RiTwitterLine, RiDiscordLine } from "react-icons/ri";

export default function Page() {
  return (
    <div
      className={clsx(
        "flex flex-col gap-6 justify-between w-full h-full pt-6 px-4 lg:px-0"
      )}
    >
      <div className="flex flex-col w-full gap-2 mb-6">
        <div className="mb-3 text-[20px] font-semibold">More</div>
        {MOREMENUS.map((menu, i) => {
          return (
            <Link
              key={i}
              href={menu.path}
              target={menu.newtab ? "_blank" : ""}
              className={clsx("flex items-center gap-3 justify-between py-3")}
            >
              <div className="flex items-center gap-3 text-lg font-medium sm:gap-6">
                <div className="text-secondary-text">{menu.icon}</div>
                {menu.title}
              </div>
              <div className="text-secondary-text">
                <HiOutlineChevronRight size={24} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* <div className="flex items-center justify-between w-full text-secondary-text sm:hidden">
        <div className="text-xs">Find us on</div>
        <div className="flex items-center gap-3">
          <Link href="https://twitter.com/PlottyFi" target="_blank">
            <RxTwitterLogo />
          </Link>
          <Link href="https://discord.gg/dG2dPpCUKE" target="_blank">
            <RxDiscordLogo />
          </Link>
        </div>
      </div> */}
    </div>
  );
}

const MOREMENUS = [
  {
    title: "Leaderboard",
    icon: <BiBarChartAlt2 size={24} />,
    path: "https://galxe.com/PlottyFi/leaderboard",
    newtab: true,
  },
  {
    title: "Twitter",
    icon: <RiTwitterLine size={24} />,
    path: "https://twitter.com/PlottyFi",
    newtab: true,
  },
  {
    title: "Discord",
    icon: <RiDiscordLine size={24} />,
    path: "https://discord.gg/dG2dPpCUKE",
    newtab: true,
  },
];
