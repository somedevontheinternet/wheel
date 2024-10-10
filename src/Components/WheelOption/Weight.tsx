import { InputAdornment, TextField } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import {
  updateCurrentWheelOption,
  useCurrentWheelOptionWeight,
} from "../../redux/slices/wheels";
import BalanceIcon from "@mui/icons-material/Balance";
import { WithSxProps } from "../WithSxProps";

type WeightProps = WithSxProps<{
  optionI: number;
}>;

export const Weight = ({ optionI, sx }: WeightProps) => {
  const weight = useCurrentWheelOptionWeight(optionI);
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseFloat(e.target.value);
    if (isNaN(newWeight)) return;
    dispatch(
      updateCurrentWheelOption({
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
