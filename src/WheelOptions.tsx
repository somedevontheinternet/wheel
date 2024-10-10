import { Box, IconButton } from "@mui/material";
import { addCurrentWheelOption } from "./redux/slices/wheels";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "./redux/hooks";
import { OpenCheatButton } from "./OpenCheatButton";
import { HostConnection } from "./HostConnection";
import { RecursiveWheelOption } from "./RecursiveWheelOption";

export const WheelOptions = () => {
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ overflowY: "scroll" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton onClick={() => dispatch(addCurrentWheelOption())}>
          <AddIcon />
        </IconButton>
        <OpenCheatButton />
        <HostConnection />
      </Box>
      <RecursiveWheelOption optionI={0} />
    </Box>
  );
};
