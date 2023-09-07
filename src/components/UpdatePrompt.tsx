import clsx from "clsx";
import { usePathHistory } from "state/path";
import Button from "components/Button";
import { isPWA } from "lib/isPWA";

export default function UpdatePrompt() {
  const { store } = usePathHistory();

  return store[1] && !store[1].includes("/home?version=1") && isPWA() ? (
    <div
      className={clsx(
        "fixed inset-0 z-[1] bg-primary-text bg-opacity-25",
        "flex flex-col justify-end"
      )}
    >
      <div
        className={clsx(
          "bg-primary-white rounded-t-xl",
          "px-4 py-4 border-t border-secondary-text border-opacity-10",
          "flex items-center gap-3"
        )}
      >
        <div className="w-full">
          A new update is now available. Please update by re-installing the app
          from the browser.
        </div>
        <a href="/login?flag=install" target="_blank">
          <Button>Update</Button>
        </a>
      </div>
    </div>
  ) : null;
}
