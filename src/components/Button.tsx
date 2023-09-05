import clsx from "clsx";

export default function Button({
  kind = "primary",
  size = "lg",
  px = "px-4",
  onClick,
  className,
  disabled,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLDivElement> & {
  kind?: KINDS;
  size?: SIZES;
  px?: string;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center select-none gap-[6px] font-semibold rounded-full",
        KIND_VARIANTS[kind],
        SIZE_VARIANTS[size],
        px,
        className,
        disabled && "opacity-50"
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
  | "outline-negative";

const KIND_VARIANTS: { [kind in KINDS]: string } = {
  primary: "bg-primary text-primary-white",
  transparent:
    "screen-hover:hover:bg-secondary-text screen-hover:hover:bg-opacity-10 active:bg-secondary-text active:bg-opacity-10 transition-opacity",
  "solid-black": "bg-primary-text text-primary-white",
  "outline-black":
    "screen-hover:hover:bg-secondary-text screen-hover:hover:bg-opacity-10 active:bg-secondary-text active:bg-opacity-10 transition-opacity border border-secondary-text border-opacity-20",
  "outline-negative":
    "screen-hover:hover:bg-red-500 screen-hover:hover:bg-opacity-10 active:bg-red-500 active:bg-opacity-10 transition-opacity border border-secondary-text border-opacity-20 screen-hover:hover:text-red-500",
};

type SIZES = "lg" | "md" | "sm" | "xs" | "fit";

const SIZE_VARIANTS: { [size in SIZES]: string } = {
  lg: "h-12",
  md: "h-[38px]",
  sm: "h-8",
  xs: "h-7",
  fit: "h-fit",
};
