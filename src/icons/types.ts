import { SVGAttributes } from "react";

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  size?: number;
  color?: `text-${string}-${number}`;
}