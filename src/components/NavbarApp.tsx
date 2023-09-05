import AuthButton from "components/AuthButton";
import Search from "components/Search";
import clsx from "clsx";
import BackButton from "components/BackButton";

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
          <div className="flex gap-3">
            <BackButton />
            <Search />
          </div>

          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
