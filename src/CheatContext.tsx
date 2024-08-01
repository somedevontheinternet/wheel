import { createContext } from "react";

export interface ActiveWindow {
  win: Window;
  ready: boolean;
}

export interface Cheat {
  activeWindow?: ActiveWindow;
  setActiveWindow: (window?: ActiveWindow) => void;
}

export const CheatContext = createContext<Cheat>({
  setActiveWindow: () => {},
});
