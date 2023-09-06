export const START_URL = window.matchMedia("(display-mode: standalone)").matches
  ? "/home?version=1"
  : "/home";