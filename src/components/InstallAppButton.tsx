import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { isIOS } from "react-device-detect";
import { isPWA } from "lib/isPWA";

export default function InstallAppButton() {
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (!promptInstall) {
      if (isPWA()) {
        alert(
          `To install the app, you'll need to open it in your browser. Simply tap on the menu icon and select "Open in Browser"`
        );
        return;
      }

      if (isIOS) {
        alert(
          `Install this app on your Phone: Tap "Share" icon and then "Add to homescreen"`
        );
        return;
      }

      alert(
        `To reinstall the app, you'll need to uninstall it first and then reinstall it.`
      );
      return;
    }
    promptInstall.prompt();
  };

  return (
    <Button id="setup_button" onClick={onClick}>
      Plotty App
    </Button>
  );
}
