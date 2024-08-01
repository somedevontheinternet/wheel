import { useContext, useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { setInfluence, setPrimed, usePrimed } from "./redux/slices/cheat";
import { CheatContext } from "./CheatContext";
import { useActiveWheelOptions, useCurrentWheel } from "./redux/slices/wheels";
import {
  createKeepAliveMessage,
  createPrimeMessage,
  createUpdateWheelOptionsMessage,
  makeMessageHandler,
  sendMessage,
} from "./Cheat/CheatMessages";

export const CheatCommunicator = () => {
  const wheelI = useCurrentWheel();
  const options = useActiveWheelOptions(wheelI);
  const cheat = useContext(CheatContext);
  const dispatch = useAppDispatch();
  const primed = usePrimed();

  // Handle incoming messages
  useEffect(() => {
    const handler = makeMessageHandler({
      updateInfluence: (values) => {
        dispatch(setInfluence(values));
        dispatch(setPrimed(true));
      },
      readyWindow: () => {
        if (!cheat.activeWindow) return;
        cheat.setActiveWindow({ win: cheat.activeWindow!.win, ready: true });
      },
      closeWindow: () => {
        cheat.setActiveWindow();
      },
    });
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [cheat, dispatch]);

  // Send the wheel options to the cheat window when it changes
  useEffect(() => {
    const activeWindow = cheat.activeWindow;
    if (!activeWindow || !activeWindow.win || !activeWindow.ready) return;
    sendMessage(activeWindow.win, createUpdateWheelOptionsMessage(options));
  }, [options, cheat]);

  // ping the cheat window to keep it alive
  useEffect(() => {
    const activeWindow = cheat.activeWindow;
    if (!activeWindow || !activeWindow.win) return;

    const i = setInterval(() => {
      sendMessage(activeWindow.win, createKeepAliveMessage());
    }, 200);
    return () => clearInterval(i);
  }, [cheat]);

  useEffect(() => {
    const activeWindow = cheat.activeWindow;
    if (!activeWindow || !activeWindow.win || !activeWindow.ready) return;
    if (primed) return;
    sendMessage(activeWindow.win, createPrimeMessage(false));
  }, [cheat, primed]);

  return <></>;
};
