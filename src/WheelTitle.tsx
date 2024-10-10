import EditIcon from "@mui/icons-material/Edit";
import { useCurrentWheelName } from "./redux/slices/wheels";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { WheelTitleEditor } from "./WheelTitleEditor";
import { WheelDelete } from "./WheelDelete";

export const WheelTitle = () => {
  const [editing, setEditing] = useState(false);
  const name = useCurrentWheelName();
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
          <WheelDelete />
          <Typography variant="h3">{name}</Typography>
          <Box>
            <IconButton onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <WheelTitleEditor name={name} onSave={() => setEditing(false)} />
        </>
      )}
    </Box>
  );
};
