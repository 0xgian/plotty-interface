import clsx from "clsx";

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  px?: string;
  py?: string;
}

export default function PageContainer({
  children,
  px = "px-4",
  py = "py-6",
  className,
}: PageContainerProps) {
  return (
    <div
      className={clsx(
        "w-screen sm:w-[calc(100vw-73px)] xl:w-[calc(100vw-255px)] relative",
        px,
        className
      )}
    >
      <div className={clsx("max-w-[930px] mx-auto", py)}>{children}</div>
    </div>
  );
}
