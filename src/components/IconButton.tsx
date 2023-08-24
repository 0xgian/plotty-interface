import clsx from "clsx";

export default function IconButton({
  icon,
  size = "xl",
  activeColor,
  label,
  kind = "default",
  preventClick = true,
  onClick,
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
        onClick={onClick}
      >
        <div className="relative">
          <div
            className={clsx(
              "absolute  rounded-full ",
              size === "xl"
                ? "w-8 h-8 -top-[5px] -left-[5px]"
                : "w-[38px] h-[38px] -top-2 -left-2",
              COLORS_CLASS[activeColor].hoverBG,
              "group-hover:bg-opacity-10"
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
    hoverText: "hover:text-green-500",
    hoverBG: "group-hover:bg-green-500",
  },
  red: {
    hoverText: "hover:text-red-500",
    hoverBG: "group-hover:bg-red-500",
  },
  blue: {
    hoverText: "hover:text-primary",
    hoverBG: "group-hover:bg-primary",
  },
  black: {
    hoverText: "hover:text-primary-text",
    hoverBG: "group-hover:bg-primary-text",
  },
  white: {
    hoverText: "hover:text-white",
    hoverBG: "group-hover:bg-white",
  },
};