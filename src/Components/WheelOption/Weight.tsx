import { InputAdornment, TextField } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { updateOption, useWheelOptionWeight } from "../../redux/slices/wheels";
import BalanceIcon from "@mui/icons-material/Balance";
import { WithSxProps } from "../WithSxProps";

type WeightProps = WithSxProps<{
  wheelI: number;
  optionI: number;
}>;

export const Weight = ({ wheelI, optionI, sx }: WeightProps) => {
  const weight = useWheelOptionWeight(wheelI, optionI);
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseFloat(e.target.value);
    if (isNaN(newWeight)) return;
    dispatch(
      updateOption({
        wheelI: wheelI,
        optionI: optionI,
        option: { weight: Math.max(1, newWeight) },
      })
    );
  };

  return (
    <TextField
      sx={sx}
      value={weight}
      type="number"
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BalanceIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
