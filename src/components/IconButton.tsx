import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

export default function IconButton({
  icon,
  size = "xl",
  activeColor,
  activeAnimate = false,
  label,
  labelAnimate = false,
  kind = "default",
  preventClick = true,
  onClick,
  disabled,
  className,
  ...props
}: {
  icon: JSX.Element;
  size?: "xl" | "2xl";
  activeColor: COLORS;
  activeAnimate?: boolean;
  labelAnimate?: boolean;
  label?: string;
  kind?: "default" | "header";
  preventClick?: boolean;
} & React.ButtonHTMLAttributes<HTMLDivElement>) {
  const [showLabel, setShowLabel] = useState(true);
  return (
    <div
      className={clsx(
        "icon-button",
        "flex items-center gap-3 select-none",
        className
      )}
      onClick={(e) => {
        if (preventClick) {
          e.preventDefault();
          e.stopPropagation();
          if (labelAnimate && showLabel) {
            setShowLabel(false);
          }
        }
      }}
      {...props}
    >
      <div
        className={clsx(
          "flex items-center group cursor-pointer",
          COLORS_CLASS[activeColor].hoverText
        )}
        onClick={(e) => !disabled && onClick && onClick(e)}
      >
        <div
          className={clsx(
            "relative",
            activeAnimate &&
              "transform group-active:scale-75 transition-transform"
          )}
        >
          <div
            className={clsx(
              "absolute rounded-full",
              size === "xl"
                ? "w-8 h-8 -top-[5px] -left-[5px]"
                : "w-[38px] h-[38px] -top-2 -left-2",
              COLORS_CLASS[activeColor].hoverBG,
              "screen-hover:group-hover:bg-opacity-10 group-active:bg-opacity-10"
            )}
          />
          {icon}
        </div>
        {!!label && kind !== "header" && (
          <Transition
            show={showLabel}
            enter="ease-out duration-150"
            enterFrom="opacity-0 translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="ease-out duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-full"
            afterLeave={() => setShowLabel(true)}
            className="px-2 text-xs"
          >
            {label}
          </Transition>
        )}
      </div>
      {label && kind === "header" && (
        <div className="text-xl font-semibold">{label}</div>
      )}
    </div>
  );
}

type COLORS = "green" | "red" | "blue" | "black" | "white";

const COLORS_CLASS: {
  [color in COLORS]: { hoverText: string; hoverBG: string };
} = {
  green: {
    hoverText: "screen-hover:hover:text-green-500 active:text-green-500",
    hoverBG: "screen-hover:group-hover:bg-green-500 group-active:bg-green-500",
  },
  red: {
    hoverText: "screen-hover:hover:text-red-500 active:text-red-500",
    hoverBG: "screen-hover:group-hover:bg-red-500 group-active:bg-red-500",
  },
  blue: {
    hoverText: "screen-hover:hover:text-primary active:text-primary",
    hoverBG: "screen-hover:group-hover:bg-primary group-active:bg-primary",
  },
  black: {
    hoverText: "screen-hover:hover:text-primary-text active:text-primary-text",
    hoverBG:
      "screen-hover:group-hover:bg-primary-text group-active:bg-primary-text",
  },
  white: {
    hoverText: "screen-hover:hover:text-white active:text-white",
    hoverBG: "screen-hover:group-hover:bg-white group-active:bg-white",
  },
};
