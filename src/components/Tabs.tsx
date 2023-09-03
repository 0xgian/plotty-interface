import clsx from "clsx";
import { rippleEffect } from "lib/touchEffect";

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
  return (
    <div className="border-b select-none border-secondary-text border-opacity-10">
      <div className={clsx("flex", tabClassName)}>
        {tabs.map((tab, i) => (
          <div
            key={i}
            style={{ width: `${100 / tabs.length}%` }}
            className={clsx(
              "flex flex-col items-center pt-3 transition-all cursor-pointer",
              "screen-hover:hover:bg-secondary-text screen-hover:hover:bg-opacity-10",
              "relative overflow-hidden"
            )}
            onClick={(e) => {
              rippleEffect(e);
              onSelect(tabs[i]);
              onSelectIndex(i);
            }}
          >
            <div className="flex flex-col">
              <div
                className={clsx("pb-2", tab === selected && "font-semibold")}
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
