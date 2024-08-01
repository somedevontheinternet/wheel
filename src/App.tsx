import { Box } from "@mui/material";
import { WheelPage } from "./WheelPage";
import { WheelSelectorTabs } from "./WheelSelectorTabs";
import { AddWheelButton } from "./AddWheelButton";
import { CheatCommunicator } from "./CheatCommunicator";
import { ActiveWindow, CheatContext } from "./CheatContext";
import { useState } from "react";
import { DownloadWheelsButton } from "./Components/DownloadWheelsButton";
import { UploadWheelsButton } from "./Components/UploadWheelsButton";

export const App = () => {
  const [activeWindow, setActiveWindow] = useState<ActiveWindow | undefined>();
  return (
    <CheatContext.Provider value={{ activeWindow, setActiveWindow }}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <DownloadWheelsButton />
            <UploadWheelsButton />
          </Box>
          <WheelSelectorTabs />
          <AddWheelButton />
        </Box>
        <WheelPage />
        <CheatCommunicator />
      </Box>
    </CheatContext.Provider>
  );
};
