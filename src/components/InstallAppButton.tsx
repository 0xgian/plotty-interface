import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { isIOS } from "react-device-detect";

export default function InstallAppButton() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (!promptInstall) {
      isIOS &&
        alert(
          `Install this app on your Phone: Tap "Share" icon and then "Add to homescreen"`
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
