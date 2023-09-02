import Link from "next/link";
import AuthButton from "components/AuthButton";
import Search from "components/Search";
import { IconPlotty } from "custom-icons";
import clsx from "clsx";

export default function NavbarApp({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav className="flex h-[60px] items-center">
      <div
        className={clsx(
          "w-full lg:w-[calc(100vw-255px)] px-4 h-full",
          "border-b border-secondary-text border-opacity-10"
        )}
      >
        <div
          className={clsx(
            "flex justify-between items-center",
            "max-w-[930px] mx-auto gap-[6px] h-full"
          )}
        >
          <Link
            className="flex items-center cursor-pointer sm:hidden min-w-[30px]"
            href="/app"
          >
            <div className="flex items-center gap-[6px] h-full">
              <IconPlotty size={30} />
            </div>
          </Link>

          <Search />

          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
