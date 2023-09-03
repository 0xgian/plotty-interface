import clsx from "clsx";
import { fadeEffect } from "lib/touchEffect";

export default function IconButton({
  icon,
  size = "xl",
  activeColor,
  label,
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
  label?: string;
  kind?: "default" | "header";
  preventClick?: boolean;
} & React.ButtonHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("flex items-center gap-3 select-none", className)}
      onClick={(e) => {
        if (preventClick) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      {...props}
    >
      <div
        className={clsx(
          "flex items-center group cursor-pointer",
          COLORS_CLASS[activeColor].hoverText
        )}
        onClick={(e) => {
          if (!disabled) {
            fadeEffect(e);
            onClick && onClick(e);
          }
        }}
      >
        <div className="relative overflow-hidden">
          <div
            className={clsx(
              "absolute  rounded-full ",
              size === "xl"
                ? "w-8 h-8 -top-[5px] -left-[5px]"
                : "w-[38px] h-[38px] -top-2 -left-2",
              COLORS_CLASS[activeColor].hoverBG,
              "screen-hover:group-hover:bg-opacity-10"
            )}
          />
          {icon}
        </div>
        {label && kind !== "header" && (
          <div className="px-2 text-xs">{label}</div>
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
    hoverText: "hover:group-hover:text-green-500",
    hoverBG: "screen-hover:group-hover:bg-green-500",
  },
  red: {
    hoverText: "hover:group-hover:text-red-500",
    hoverBG: "screen-hover:group-hover:bg-red-500",
  },
  blue: {
    hoverText: "hover:group-hover:text-primary",
    hoverBG: "screen-hover:group-hover:bg-primary",
  },
  black: {
    hoverText: "hover:group-hover:text-primary-text",
    hoverBG: "screen-hover:group-hover:bg-primary-text",
  },
  white: {
    hoverText: "hover:group-hover:text-white",
    hoverBG: "screen-hover:group-hover:bg-white",
  },
};
