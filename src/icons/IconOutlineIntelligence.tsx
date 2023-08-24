import Icon from "./Icon";
import { IconProps } from "./types";

export default function IconOutlineIntelligence({ size = 24, ...props }: IconProps) {
  return (
    <Icon {...props}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.12014 5.7066C6.8165 4.94852 7.40636 4.12785 7.85943 3.32207C8.41023 4.33092 9.26126 5.38961 10.304 6.34684C11.0603 7.04107 11.8788 7.62937 12.6826 8.08177C11.6719 8.63225 10.6108 9.48414 9.65154 10.5284C8.95951 11.2818 8.37316 12.0964 7.92168 12.8962C7.37081 11.8888 6.52081 10.8319 5.47969 9.87616C4.72448 9.18288 3.90772 8.5957 3.10603 8.14399C4.11166 7.59324 5.16624 6.74504 6.12014 5.7066Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </Icon>
  );
}
