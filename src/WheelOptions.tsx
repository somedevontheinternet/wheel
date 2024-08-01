import { Box, IconButton } from "@mui/material";

import { WheelOption } from "./WheelOption";
import { addWheelOption, useWheelOptionCount } from "./redux/slices/wheels";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "./redux/hooks";
import { OpenCheatButton } from "./OpenCheatButton";
import { HostConnection } from "./HostConnection";

interface WheelOptionsProps {
  wheelI: number;
}

export const WheelOptions = ({ wheelI }: WheelOptionsProps) => {
  const count = useWheelOptionCount(wheelI);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ overflowY: "scroll" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton onClick={() => dispatch(addWheelOption({ wheelI }))}>
          <AddIcon />
        </IconButton>
        <OpenCheatButton />
        <HostConnection />
      </Box>
      {Array.from({ length: count }, (_, i) => (
        <WheelOption key={i} wheelI={wheelI} optionI={i} />
      ))}
    </Box>
  );
};
