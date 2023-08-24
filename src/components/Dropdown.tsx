import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { popOverDownAnimate } from "config/transitions";
import { Fragment, ReactNode } from "react";

export default function Dropdown({
  button,
  maxWidth = "max-w-[300px]",
  position = "bottom-left",
  children,
}: {
  button: ReactNode;
  maxWidth?: string;
  position?: POSITIONS;
  children: (renderProps: { close: () => void }) => ReactNode;
}) {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button className="outline-none">{button}</Popover.Button>
          <Transition as={Fragment} {...popOverDownAnimate}>
            <Popover.Panel
              className={clsx(
                "absolute z-[1] w-screen",
                maxWidth,
                POSITIONS_CLASS[position]
              )}
            >
              <div
                className={clsx(
                  "overflow-hidden rounded-lg shadow-lg bg-primary-white",
                  "ring-1 ring-secondary-text ring-opacity-5 select-none"
                )}
              >
                {children({ close })}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

type POSITIONS = "bottom-left" | "bottom-right" | "bottom-center";

const POSITIONS_CLASS: { [key in POSITIONS]: string } = {
  "bottom-left": "right-0 mt-1",
  "bottom-right": "left-0 mt-1",
  "bottom-center": "-translate-x-1/2 mt-1",
};
