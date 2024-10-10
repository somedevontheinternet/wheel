import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "./redux/hooks";
import { deleteCurrentWheel } from "./redux/slices/wheels";

export const WheelDelete = () => {
  const dispatch = useAppDispatch();
  return (
    <IconButton onClick={() => dispatch(deleteCurrentWheel())}>
      <DeleteIcon />
    </IconButton>
  );
};
