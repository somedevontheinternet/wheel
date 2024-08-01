import PowerIcon from "@mui/icons-material/Power";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import { useEffect } from "react";
import { createKeepAliveMessage, sendMessage } from "./CheatMessages";
import { Tooltip, Typography } from "@mui/material";

interface ConnectedIconProps {
  win: Window | null;
  alive: boolean;
}

export const ConnectedIcon = ({ alive, win }: ConnectedIconProps) => {
  // ping the other window to keep it alive
  useEffect(() => {
    if (!win) return;
    const i = setInterval(() => {
      sendMessage(win, createKeepAliveMessage());
    }, 200);
    return () => clearInterval(i);
  }, [win]);

  if (alive) {
    return <PowerIcon sx={{ color: "green" }} />;
  }
  return (
    <Tooltip
      title={<Typography>Close and re-open the cheat window</Typography>}
    >
      <PowerOffIcon sx={{ color: "red" }} />
    </Tooltip>
  );
};
