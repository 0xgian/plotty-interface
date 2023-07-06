import clsx from "clsx";
import { useCallback, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "components/Button";

export default function Navbar({
  kind = "top",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { kind?: "top" | "bottom" }) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const wrappedOnDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <nav
      className={clsx(
        "relative flex items-center w-full gap-4 px-6 py-8 xl:px-0 select-none justify-between"
      )}
      {...props}
    >
      <div className="md:absolute md:left-[calc(50%-62px)]">
        <Link className="cursor-pointer" href="/">
          <div className="flex items-center gap-2 w-[124px] h-12 pt-2">
            <Image
              src={"/images/logo.png"}
              width={45}
              height={45}
              alt="Plotty Logo"
            />
            <span className="text-2xl font-bold font-display">Plotty</span>
          </div>
        </Link>
      </div>

      <div
        onClick={() => setOpen(!open)}
        className={clsx(
          "items-center justify-center w-12 h-12 bg-white cursor-pointer md:hidden border rounded-xl",
          kind === "bottom" ? "hidden" : "flex",
          open && "z-[2] fixed top-8 right-6 sm:right-16"
        )}
      >
        {open ? <HiX size={28} /> : <HiMenu size={28} />}
      </div>

      <div
        className={clsx(
          "md:block md:static fixed top-0 right-0 w-[100vw] h-[100vh] md:w-full md:h-max p-12 pt-24 md:p-0 z-[1]",
          "md:bg-transparent dark:md:bg-transparent bg-white",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col items-center h-full gap-12 md:justify-between md:flex-row lg:gap-16">
          <div className="flex flex-col justify-center gap-8 w-max md:gap-4 lg:gap-8 md:flex-row">
            {MENU.map((m, i) => (
              <Link
                key={i}
                className={clsx(
                  "flex flex-col items-center gap-1 group",
                  m.disabled ? " cursor-not-allowed" : "cursor-pointer"
                )}
                onClick={() => {
                  if (!m.disabled) {
                    wrappedOnDismiss();
                  }
                }}
                href={!m.disabled ? m.path : pathname}
                prefetch={false}
              >
                <div
                  className={clsx(
                    "pt-1 text-[32px] md:text-base leading-none font-display font-bold md:font-sans md:font-medium whitespace-nowrap",
                    pathname === m.path
                      ? "opacity-100"
                      : m.disabled
                      ? "opacity-60"
                      : "group-hover:opacity-100 opacity-60"
                  )}
                >
                  {m.title}
                </div>
              </Link>
            ))}
          </div>

          <Link
            href={`${
              process.env.NODE_ENV !== "production"
                ? "http://app.localhost:3000"
                : `https://app.${process.env.NEXT_PUBLIC_VERCEL_URL}`
            }`}
          >
            <Button>Enter App</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

const MENU = [
  {
    title: "Home",
    path: "/",
    disabled: false,
  },
  {
    title: "Docs",
    path: "https://docs.plotty.fi",
    disabled: false,
  },
  {
    title: "Community",
    path: "https://twitter.com/PlottyFi",
    disabled: false,
  },
];
