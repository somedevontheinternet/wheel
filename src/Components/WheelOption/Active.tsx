import { IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOnIcon from "@mui/icons-material/Visibility";
import { useAppDispatch } from "../../redux/hooks";
import {
  updateOption,
  useHasFewActiveOptions,
  useWheelOptionActive,
} from "../../redux/slices/wheels";
import { WithSxProps } from "../WithSxProps";

type ActiveProps = WithSxProps<{
  wheelI: number;
  optionI: number;
}>;

export const Active = ({ wheelI, optionI, sx }: ActiveProps) => {
  const active = useWheelOptionActive(wheelI, optionI);
  const fewOptions = useHasFewActiveOptions(wheelI);
  const dispatch = useAppDispatch();

  const onClick = () =>
    dispatch(
      updateOption({
        wheelI: wheelI,
        optionI: optionI,
        option: { active: !active },
      })
    );

  return (
    <IconButton sx={sx} onClick={onClick} disabled={active && fewOptions}>
      {active ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
    </IconButton>
  );
};
