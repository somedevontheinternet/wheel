import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { WheelOption } from "../redux/slices/wheels";
import { Entry } from "./Entry";
import {
  createCloseWindowMessage,
  createReadyWindowMessage,
  createUpdateInfluenceMessage,
  makeMessageHandler,
  sendMessage,
} from "./CheatMessages";
import { ConnectedIcon } from "./ConnectedIcon";
import { useKeepAlive } from "./useKeepAlive";

export const CheatWindow = () => {
  const alive = useKeepAlive();
  const [options, setOptions] = useState<WheelOption[]>([]);
  const [influence, setInfluence] = useState<number[]>([]);

  // Handle incoming messages
  useEffect(() => {
    const handler = makeMessageHandler({
      updateWheelOptions: (options) => {
        setOptions(options);
        setInfluence(options.map(() => 1));
      },
      prime: () => {
        if (!options.length) return;
        setInfluence(options.map(() => 1));
      },
    });
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [setOptions, setInfluence, options]);

  // Ready the window
  useEffect(() => sendMessage(window.opener, createReadyWindowMessage()), []);

  // disconnect on close
  useEffect(() => {
    const beforeunload = () =>
      sendMessage(window.opener, createCloseWindowMessage());
    window.addEventListener("beforeunload", beforeunload);
    return () => window.removeEventListener("beforeunload", beforeunload);
  }, []);

  const onInfluenceChange = (i: number) => (next: number) => {
    const newInfluence = influence.map((v, j) => (i === j ? next : v));
    setInfluence(newInfluence);
    sendMessage(window.opener, createUpdateInfluenceMessage(newInfluence));
  };

  return (
    <Box>
      <Typography variant="h4">
        "Extra" window ;)
        <ConnectedIcon alive={alive} win={window.opener} />
      </Typography>

      {options.map((o, i) => (
        <Entry
          key={i}
          label={o.label}
          influence={influence[i]}
          setInfluence={onInfluenceChange(i)}
          enabled={alive}
        />
      ))}
    </Box>
  );
};
