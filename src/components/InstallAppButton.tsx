import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { isIOS } from "react-device-detect";
import { isPWA } from "lib/isPWA";

export default function InstallAppButton() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [pwaInstalled, setPWAInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  useEffect(() => {
    window.addEventListener("appinstalled", () => {
      setPWAInstalled(true);
    });
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (pwaInstalled) {
      alert(
        `To reinstall the app, you'll need to uninstall it first and then reinstall it.`
      );
      return;
    }

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
