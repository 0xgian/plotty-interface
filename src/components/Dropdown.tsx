import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";

export default function Dropdown({
  button,
  maxWidth = "max-w-[300px]",
  position = "bottom-left",
  customPosition,
  children,
}: {
  button: ReactNode;
  maxWidth?: string;
  position?: POSITIONS;
  customPosition?: string;
  children: (renderProps: { close: () => void }) => ReactNode;
}) {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button className="outline-none">{button}</Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={clsx(
                "absolute z-[1] w-screen",
                maxWidth,
                customPosition ?? POSITIONS_CLASS[position]
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
