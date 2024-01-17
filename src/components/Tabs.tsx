import clsx from "clsx";
import { rippleEffect } from "lib/touchEffect";
import { MouseEvent, useCallback, useRef } from "react";

export default function Tabs({
  tabs,
  selected,
  onSelect = (value) => value,
  onSelectIndex = (index) => index,
  tabClassName = "w-full",
}: {
  tabs: string[];
  selected: string;
  onSelect?: (value: string) => void;
  onSelectIndex?: (index: number) => void;
  tabClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const updateTabView = useCallback(
    (e: MouseEvent) => {
      const containerEl = ref.current;
      if (containerEl) {
        let bounds = containerEl.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        // let y = e.clientY - bounds.top;
        const bufferScroll = containerEl.clientWidth * 0.38;

        if (x < bufferScroll) {
          containerEl.scrollTo({
            left: containerEl.scrollLeft - bufferScroll,
          });
        }

        if (containerEl.clientWidth - x < bufferScroll) {
          containerEl.scrollTo({
            left: containerEl.scrollLeft + bufferScroll,
          });
        }
      }
    },
    [ref]
  );

  return (
    <div className="border-b select-none border-secondary-text border-opacity-10">
      <div
        className={clsx(
          "flex overflow-x-auto scrollbar-none scroll-smooth",
          tabClassName
        )}
        ref={ref}
      >
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={clsx(
              "flex flex-col items-center pt-3 transition-all cursor-pointer px-4",
              "screen-hover:hover:bg-secondary-text screen-hover:hover:bg-opacity-10",
              "relative overflow-hidden",
              tabs.length > 4 ? "min-w-max" : "w-full"
            )}
            onClick={(e) => {
              rippleEffect(e);
              updateTabView(e);
              onSelect(tabs[i]);
              onSelectIndex(i);
            }}
          >
            <div className="flex flex-col">
              <div
                className={clsx(
                  "pb-2 whitespace-nowrap",
                  tab === selected && "font-semibold"
                )}
              >
                {tab}
              </div>
              <div
                className={clsx(
                  "min-h-[4px] rounded-t-full w-full",
                  tab === selected && "bg-primary"
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
