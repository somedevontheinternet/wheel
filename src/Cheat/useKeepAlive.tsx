import { useEffect, useState } from "react";
import { makeMessageHandler } from "./CheatMessages";

export const useKeepAlive = () => {
  const [alive, setAlive] = useState(false);

  useEffect(() => {
    let lastPing = 0;
    const handler = makeMessageHandler({
      keepAlive: () => {
        lastPing = Date.now();
      },
    });
    const i = setInterval(() => {
      setAlive(Date.now() - lastPing < 1000);
    });
    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
      clearInterval(i);
    };
  }, []);

  return alive;
};
