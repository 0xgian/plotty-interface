import Image from "next/image";
import Link from "next/link";
import { HiOutlineSearch } from "react-icons/hi";
import ConnectButton from "components/ConnectButton";

export default function NavbarApp({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav className="flex h-[60px] items-center border-b border-secondary-text border-opacity-10">
      <div className="w-[73px] lg:w-[255px] px-6">
        <Link className="cursor-pointer" href="/">
          <div className="flex items-center gap-[6px]">
            <Image
              src={"/images/logo-black.png"}
              width={30}
              height={30}
              alt="Plotty Logo"
            />
            <span className="text-[20px] font-bold font-display hidden lg:block">
              Plotty
            </span>
          </div>
        </Link>
      </div>

      <div className="w-[calc(100vw-73px)] lg:w-[calc(100vw-255px)] pr-6 sm:px-6">
        <div className="flex justify-between items-center max-w-[930px] mx-auto gap-[6px]">
          <div className="flex items-center gap-3 bg-opacity-10 bg-secondary-text h-[42px] max-w-[348px] w-full px-3 rounded-full">
            <HiOutlineSearch size={20} className="text-secondary-text" />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-ellipsis"
              placeholder="Search address / handle"
            />
          </div>

          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
