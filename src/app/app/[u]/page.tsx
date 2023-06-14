"use client";

import clsx from "clsx";
import Button from "components/Button";
import { Avatar } from "components/Providers";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiOutlineDocumentDuplicate, HiOutlineQrcode } from "react-icons/hi";
import QRCode from "react-qr-code";

export default function Page() {
  const { u } = useParams();
  const handle = "No Handle";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-[30px]">
        <Avatar address={u} size={132} />
        <div className="flex flex-col text-right">
          <div className="text-4xl font-bold font-display">$20,061,648</div>
          <div className="font-medium text-red-500 font-display">
            -2.4% ($488,858.11)
          </div>
        </div>
      </div>

      <div className="flex gap-[30px] justify-between">
        <div className="w-full sm:max-w-[600px] gap-3">
          <div className="flex flex-col">
            <div
              className={clsx(
                "font-bold font-display text-xl",
                handle === "No Handle" && "text-secondary-text"
              )}
            >
              {handle}
            </div>
            <div className="flex gap-3 text-secondary-text">
              <div>{u}</div>
              <div className="flex gap-1">
                <div
                  className="flex items-center justify-center w-6 h-6 rounded-full cursor-pointer bg-secondary-text bg-opacity-10"
                  onClick={() => {
                    navigator.clipboard.writeText(u);
                    toast.success("Copied");
                  }}
                >
                  <HiOutlineDocumentDuplicate size={16} />
                </div>
                <div
                  className={clsx(
                    "relative flex items-center justify-center w-6 h-6 rounded-full",
                    "cursor-pointer bg-secondary-text bg-opacity-10 group"
                  )}
                  onClick={() => {}}
                >
                  <HiOutlineQrcode size={16} />
                  <div
                    className={clsx(
                      "bg-white border border-opacity-10 rounded-xl border-secondary-text transition-all",
                      "absolute top-8 h-0 w-0 opacity-0 group-hover:h-32 group-hover:w-32 group-hover:p-3 group-hover:opacity-100"
                    )}
                  >
                    <QRCode size={132} value={u} viewBox={`0 0 256 256`} className="w-full h-full"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button>Follow</Button>
      </div>
    </div>
  );
}
