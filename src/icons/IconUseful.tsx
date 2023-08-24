import Icon from "./Icon";
import { IconProps } from "./types";

export default function IconUseful({ size = 24, ...props }: IconProps) {
  return (
    <Icon {...props}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.122 18.9079C20.8745 18.3289 21.3648 17.4738 21.484 16.5319C21.6669 15.0868 21.7611 13.6141 21.7611 12.1194C21.7611 10.5225 21.6535 8.95071 21.4452 7.4109C21.3191 6.4787 20.8295 5.63456 20.0831 5.06199C17.6953 3.23019 15.0632 1.70102 12.2441 0.531812C11.371 0.169734 10.3901 0.169734 9.51706 0.531812C6.69792 1.70101 4.06578 3.23017 1.67801 5.06196C0.931647 5.63454 0.442004 6.47867 0.315893 7.41087C0.10758 8.95069 0 10.5225 0 12.1194C0 13.6141 0.0942562 15.0869 0.277142 16.5319C0.396354 17.4739 0.886606 18.3289 1.63912 18.9079C4.0372 20.7529 6.6826 22.2924 9.51706 23.4679C10.3901 23.83 11.371 23.83 12.244 23.4679C15.0785 22.2924 17.7239 20.7529 20.122 18.9079ZM16.4803 8.9195C16.4803 8.70737 16.3961 8.50392 16.2461 8.3539C16.0961 8.20392 15.8926 8.11967 15.6805 8.11967C15.4684 8.11967 15.2649 8.20392 15.1149 8.3539L9.28049 14.1883L6.64609 11.5539C6.49521 11.4082 6.29313 11.3275 6.08337 11.3294C5.87361 11.3312 5.67297 11.4153 5.52464 11.5636C5.37631 11.712 5.29218 11.9126 5.29035 12.1224C5.28853 12.3321 5.36917 12.5342 5.51489 12.6851L8.71489 15.8851C8.86492 16.0351 9.06836 16.1193 9.28049 16.1193C9.49262 16.1193 9.69607 16.0351 9.84609 15.8851L16.2461 9.4851C16.3961 9.33508 16.4803 9.13163 16.4803 8.9195Z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
}