import AuthButton from "components/AuthButton";
import Search from "components/Search";
import clsx from "clsx";
import BackButton from "components/BackButton";
import { Suspense } from "react";

export default function NavbarApp({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav className="flex h-[60px] items-center">
      <div
        className={clsx(
          "w-full sm:w-[calc(100vw-73px)] xl:w-[calc(100vw-255px)] h-full"
        )}
      >
        <div
          className={clsx(
            "flex justify-between items-center",
            "max-w-[930px] mx-auto gap-[6px] h-full",
            "px-4 sm:pr-0 xl:px-0",
            "border-b border-secondary-text border-opacity-10"
          )}
        >
          <Suspense>
            <div >
              <BackButton />
              <Search />
            </div>
          </Suspense>

          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
