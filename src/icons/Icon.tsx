import clsx from "clsx";
import { IconProps } from "./types";

export default function Icon({
  color,
  className,
  children,
  ...props
}: IconProps) {
  return (
    <span className={clsx(className, color)} {...props}>
      {children}
    </span>
  );
}
