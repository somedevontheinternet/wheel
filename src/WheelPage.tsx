import { Box } from "@mui/material";
import { useCurrentWheel } from "./redux/slices/wheels";

import { WheelTitle } from "./WheelTitle";
import { SpinningWheel } from "./SpinningWheel";
import { WheelOptions } from "./WheelOptions";

export const WheelPage = () => {
  const i = useCurrentWheel();

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
        <WheelTitle wheelI={i} />
        <SpinningWheel wheelI={i} />
      </Box>
      <WheelOptions wheelI={i} />
    </Box>
  );
};
