import { Box } from "@mui/material";

import { Label } from "./Components/WheelOption/Label";
import { Weight } from "./Components/WheelOption/Weight";
import { Color } from "./Components/WheelOption/Color";
import { Delete } from "./Components/WheelOption/Delete";
import { Active } from "./Components/WheelOption/Active";
import { Order } from "./Components/WheelOption/Order";

interface WheelOptionProps {
  optionI: number;
}
export const WheelOption = ({ optionI }: WheelOptionProps) => {
  return (
    <Box
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Order optionI={optionI} next={false} />
        <Label sx={{ width: "100%" }} optionI={optionI} />
        <Delete sx={{ ml: 1 }} optionI={optionI} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Order optionI={optionI} next={true} />
        <Weight optionI={optionI} />
        <Color optionI={optionI} />
        <Active sx={{ ml: 1 }} optionI={optionI} />
      </Box>
    </Box>
  );
};
