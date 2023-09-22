import clsx from "clsx";
import Image from "next/image";

export default function Empty({
  title,
  desc,
  mt = "mt-8",
}: {
  title: string;
  desc: string;
  mt?: string;
}) {
  return (
    <div
      className={clsx(
        "h-32 flex items-center justify-center w-full sm:max-w-[600px] py-6 px-4",
        mt
      )}
    >
      <div className="flex flex-col items-center w-full h-full gap-4 max-w-[348px]">
        <div>
          <Image
            alt="empty"
            src="/images/app/empty.png"
            width={348}
            height={168}
            className="object-contain"
          />
        </div>
        <div className="w-full mt-4 text-3xl font-semibold">{title}</div>
        <div className="w-full">{desc}</div>
      </div>
    </div>
  );
}
