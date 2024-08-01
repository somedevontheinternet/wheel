import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "./redux/hooks";
import { deleteWheel } from "./redux/slices/wheels";

interface WheelDeleteProps {
  wheelI: number;
}

export const WheelDelete = ({ wheelI }: WheelDeleteProps) => {
  const dispatch = useAppDispatch();
  return (
    <IconButton onClick={() => dispatch(deleteWheel(wheelI))}>
      <DeleteIcon />
    </IconButton>
  );
};
