import { IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOnIcon from "@mui/icons-material/Visibility";
import { useAppDispatch } from "../../redux/hooks";
import {
  updateCurrentWheelOption,
  useCurrentWheelHasFewActiveOptions,
  useCurrentWheelOptionActive,
} from "../../redux/slices/wheels";
import { WithSxProps } from "../WithSxProps";

type ActiveProps = WithSxProps<{
  optionI: number;
}>;

export const Active = ({ optionI, sx }: ActiveProps) => {
  const active = useCurrentWheelOptionActive(optionI);
  const fewOptions = useCurrentWheelHasFewActiveOptions();
  const dispatch = useAppDispatch();

  const onClick = () =>
    dispatch(
      updateCurrentWheelOption({
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
