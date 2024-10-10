import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteCurrentWheelOption,
  useCurrentWheelHasFewActiveOptions,
  useCurrentWheelOptionActive,
} from "../../redux/slices/wheels";
import { WithSxProps } from "../WithSxProps";

type DeleteProps = WithSxProps<{
  optionI: number;
}>;

export const Delete = ({ optionI, sx }: DeleteProps) => {
  const dispatch = useAppDispatch();
  const active = useCurrentWheelOptionActive(optionI);
  const fewOptions = useCurrentWheelHasFewActiveOptions();

  const onClick = () => dispatch(deleteCurrentWheelOption(optionI));

  return (
    <IconButton sx={sx} onClick={onClick} disabled={active && fewOptions}>
      <DeleteIcon />
    </IconButton>
  );
};
