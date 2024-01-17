import clsx from "clsx";

export default function Button({
  kind = "primary",
  size = "lg",
  px = "px-4",
  active = true,
  onClick,
  className,
  disabled,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLDivElement> & {
  kind?: KINDS;
  size?: SIZES;
  px?: string;
  active?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex cursor-pointer items-center justify-center select-none gap-[6px] font-semibold rounded-full",
        KIND_VARIANTS[kind].base,
        KIND_VARIANTS[kind][disabled || !active ? "inactive" : "active"],
        SIZE_VARIANTS[size],
        px,
        className
      )}
      onClick={(e) => !disabled && onClick && onClick(e)}
      {...props}
    >
      {children}
    </div>
  );
}

type KINDS =
  | "primary"
  | "transparent"
  | "solid-black"
  | "outline-black"
  | "outline-negative"
  | "outline-positive"
  | "outline-active-positive";

const KIND_VARIANTS: {
  [kind in KINDS]: { [key in "base" | "active" | "inactive"]: string };
} = {
  primary: {
    base: "bg-primary text-primary-white",
    active: "",
    inactive: "opacity-50",
  },
  transparent: {
    base: "screen-hover:hover:bg-secondary-text screen-hover:hover:bg-opacity-10 active:bg-secondary-text active:bg-opacity-10 transition-opacity",
    active: "",
    inactive: "opacity-50",
  },
  "solid-black": {
    base: "bg-primary-text text-primary-white",
    active: "",
    inactive: "opacity-50",
  },
  "outline-black": {
    base: "screen-hover:hover:bg-secondary-text screen-hover:hover:bg-opacity-10 active:bg-secondary-text active:bg-opacity-10 transition-opacity border border-secondary-text border-opacity-20",
    active: "",
    inactive: "opacity-50",
  },
  "outline-negative": {
    base: "screen-hover:hover:bg-red-500 screen-hover:hover:bg-opacity-10 transition-opacity border border-secondary-text border-opacity-20 screen-hover:hover:text-red-500",
    active: "",
    inactive: "opacity-50",
  },
  "outline-positive": {
    base: "screen-hover:hover:bg-green-500 screen-hover:hover:bg-opacity-10 transition-opacity border border-secondary-text border-opacity-20 screen-hover:hover:text-green-500",
    active: "",
    inactive: "opacity-50",
  },
  "outline-active-positive": {
    base: "transition-opacity border",
    active: "border-secondary-text border-opacity-20 text-green-500",
    inactive: "bg-secondary-text bg-opacity-10 screen-hover:hover:bg-primary-white border border-opacity-0 border-secondary-text screen-hover:hover:border-opacity-20 text-secondary-text screen-hover:hover:text-green-500",
  },
};

type SIZES = "lg" | "md" | "sm" | "xs" | "fit";

const SIZE_VARIANTS: { [size in SIZES]: string } = {
  lg: "h-12",
  md: "h-[38px]",
  sm: "h-8",
  xs: "h-7",
  fit: "h-fit",
};
