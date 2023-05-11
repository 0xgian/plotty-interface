import clsx from "clsx";

export default function Button({
  kind = "primary",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLDivElement> & { kind?: "primary" | "outline" }) {
  return (
    <div
      className={clsx(
        "flex items-center h-12 cursor-pointer font-display bg-gradient-primary rounded-xl min-w-[132px] justify-center px-6 select-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
