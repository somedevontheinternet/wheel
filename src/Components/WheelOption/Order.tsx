import {
  swapOptions,
  useWheelOptionActive,
  useWheelOptionCount,
} from "../../redux/slices/wheels";
import { WithSxProps } from "../WithSxProps";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";

type OrderProps = WithSxProps<{
  wheelI: number;
  optionI: number;
  next: boolean;
}>;

export const Order = ({ wheelI, optionI, next }: OrderProps) => {
  const optionsCount = useWheelOptionCount(wheelI);
  const active = useWheelOptionActive(wheelI, optionI);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(
      swapOptions({
        wheelI: wheelI,
        optionI: optionI,
        optionJ: next ? optionI + 1 : optionI - 1,
      })
    );
  };
  return (
    <IconButton
      onClick={onClick}
      disabled={
        !active ||
        (!next && optionI === 0) ||
        (next && optionsCount === optionI + 1)
      }
    >
      {!next ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
    </IconButton>
  );
};
