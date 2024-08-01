import { useContext } from "react";
import { ConnectedIcon } from "./Cheat/ConnectedIcon";
import { CheatContext } from "./CheatContext";
import { Box } from "@mui/material";
import { useKeepAlive } from "./Cheat/useKeepAlive";

export const HostConnection = () => {
  const alive = useKeepAlive();
  const cheat = useContext(CheatContext);
  if (!cheat.activeWindow) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <ConnectedIcon alive={alive} win={cheat.activeWindow.win} />
    </Box>
  );
};
