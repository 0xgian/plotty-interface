import clsx from "clsx";

export default function Button({
  kind = "primary",
  size = "large",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLDivElement> & {
  kind?: "primary" | "solid";
  size?: "large" | "medium";
}) {
  return (
    <div
      className={clsx(
        "cursor-pointer flex items-center px-[10px] justify-center select-none gap-[6px] font-display ",
        kind === "primary"
          ? "bg-gradient-primary"
          : "hover:bg-secondary-text hover:bg-opacity-10",
        size === "large"
          ? "h-12 min-w-[132px] rounded-xl"
          : "h-[32px] rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
