import EditIcon from "@mui/icons-material/Edit";
import { useWheelName } from "./redux/slices/wheels";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { WheelTitleEditor } from "./WheelTitleEditor";
import { WheelDelete } from "./WheelDelete";

interface WheelTitleProps {
  wheelI: number;
}

export const WheelTitle = ({ wheelI }: WheelTitleProps) => {
  const [editing, setEditing] = useState(false);
  const name = useWheelName(wheelI);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!editing ? (
        <>
          <WheelDelete wheelI={wheelI} />
          <Typography variant="h3">{name}</Typography>
          <Box>
            <IconButton onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <WheelTitleEditor
            wheelI={wheelI}
            name={name}
            onSave={() => setEditing(false)}
          />
        </>
      )}
    </Box>
  );
};
