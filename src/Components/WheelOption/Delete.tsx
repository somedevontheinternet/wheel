import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteOption,
  useHasFewActiveOptions,
  useWheelOptionActive,
} from "../../redux/slices/wheels";
import { WithSxProps } from "../WithSxProps";

type DeleteProps = WithSxProps<{
  wheelI: number;
  optionI: number;
}>;

export const Delete = ({ wheelI, optionI, sx }: DeleteProps) => {
  const dispatch = useAppDispatch();
  const active = useWheelOptionActive(wheelI, optionI);
  const fewOptions = useHasFewActiveOptions(wheelI);

  const onClick = () =>
    dispatch(deleteOption({ wheelI: wheelI, optionI: optionI }));

  return (
    <IconButton sx={sx} onClick={onClick} disabled={active && fewOptions}>
      <DeleteIcon />
    </IconButton>
  );
};
