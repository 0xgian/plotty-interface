import clsx from "clsx";
import { IconIntelligence, IconPhinder } from "custom-icons";

export default function BrandLoading({ listView }: { listView?: boolean }) {
  return (
    <div
      className={clsx(
        listView &&
          "h-32 flex items-center justify-center w-full sm:max-w-[600px] py-3 px-4"
      )}
    >
      <div className="relative flex items-end">
        <IconPhinder size={30} />
        <IconIntelligence
          size={10}
          className="absolute -top-[5px] -right-[5px] animate-spin text-primary"
        />
      </div>
    </div>
  );
}
