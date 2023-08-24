import clsx from "clsx";

export default function TextGradient({
  children,
  className,
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "relative font-semibold bg-gradient-primary bg-clip-text",
        className
      )}
      style={{ WebkitTextFillColor: "transparent" }}
    >
      {children}
    </span>
  );
}
