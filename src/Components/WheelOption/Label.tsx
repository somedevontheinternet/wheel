import { TextField } from "@mui/material";
import { updateOption, useWheelOptionLabel } from "../../redux/slices/wheels";
import { useAppDispatch } from "../../redux/hooks";
import { WithSxProps } from "../WithSxProps";

type NameProps = WithSxProps<{
  wheelI: number;
  optionI: number;
}>;

export const Label = ({ wheelI, optionI, sx }: NameProps) => {
  const label = useWheelOptionLabel(wheelI, optionI);
  const dispatch = useAppDispatch();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateOption({
        wheelI: wheelI,
        optionI: optionI,
        option: { label: e.target.value },
      })
    );

  return <TextField sx={sx} value={label} onChange={onNameChange} />;
};
