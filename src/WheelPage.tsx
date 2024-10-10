import { Box } from "@mui/material";

import { WheelTitle } from "./WheelTitle";
import { SpinningWheel } from "./SpinningWheel";
import { WheelOptions } from "./WheelOptions";

export const WheelPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        p: 2,
        display: "flex",
        justifyContent: "start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <WheelTitle />
        <SpinningWheel />
      </Box>
      <WheelOptions />
    </Box>
  );
};
