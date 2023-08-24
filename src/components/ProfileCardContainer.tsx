import clsx from "clsx";
import { ReactNode } from "react";

export default function ProfileCardContainer({
  borderHidden = false,
  children,
  className,
  ...props
}: {
  borderHidden?: boolean;
  children: ReactNode;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "cursor-pointer hover:bg-secondary-text hover:bg-opacity-5 transition-all",
        "w-full sm:max-w-[600px] py-3 px-4",
        !borderHidden && "border-b border-secondary-text border-opacity-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
