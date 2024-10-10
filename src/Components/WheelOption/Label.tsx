import { TextField } from "@mui/material";
import {
  updateCurrentWheelOption,
  useCurrentWheelOptionLabel,
} from "../../redux/slices/wheels";
import { useAppDispatch } from "../../redux/hooks";
import { WithSxProps } from "../WithSxProps";

type NameProps = WithSxProps<{
  optionI: number;
}>;

export const Label = ({ optionI, sx }: NameProps) => {
  const label = useCurrentWheelOptionLabel(optionI);
  const dispatch = useAppDispatch();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateCurrentWheelOption({
        optionI: optionI,
        option: { label: e.target.value },
      })
    );

  return <TextField sx={sx} value={label} onChange={onNameChange} />;
};
