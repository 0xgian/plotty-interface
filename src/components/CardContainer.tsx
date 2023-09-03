import clsx from "clsx";
import { fadeEffect } from "lib/touchEffect";
import { ReactNode } from "react";

export default function CardContainer({
  borderHidden = false,
  children,
  className,
  onClick,
  ...props
}: {
  borderHidden?: boolean;
  children: ReactNode;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "cursor-pointer screen-hover:hover:bg-secondary-text screen-hover:hover:bg-opacity-5 transition-all",
        "w-full sm:max-w-[600px] py-3 px-4",
        !borderHidden && "border-b border-secondary-text border-opacity-10",
        className
      )}
      onClick={(e) => {
        fadeEffect(e);
        onClick && onClick(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
