import clsx from "clsx";
import { usePathHistory } from "state/path";
import Button from "components/Button";
import { isPWA } from "lib/isPWA";
import manifest from "../../public/manifest.json";
import { useState } from "react";

export default function UpdatePrompt() {
  const { store } = usePathHistory();
  const [show, setShow] = useState(
    store[1] && !store[1].includes(manifest.start_url) && isPWA()
  );

  return show ? (
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
        <Button
          onClick={() =>
            alert(
              `To install the app, you'll need to open it in your browser. Simply tap on the menu icon and select "Open in Browser"`
            )
          }
          className="min-w-[86px]"
        >
          Update
        </Button>
      </div>
    </div>
  ) : null;
}
