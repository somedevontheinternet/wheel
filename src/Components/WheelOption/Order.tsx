import {
  swapCurrentWheelOptions,
  useIsCurrentWheelLastOption,
  useCurrentWheelOptionActive,
} from "../../redux/slices/wheels";
import { WithSxProps } from "../WithSxProps";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";

type OrderProps = WithSxProps<{
  optionI: number;
  next: boolean;
}>;

export const Order = ({ optionI, next }: OrderProps) => {
  const isLastOption = useIsCurrentWheelLastOption(optionI);
  const active = useCurrentWheelOptionActive(optionI);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(
      swapCurrentWheelOptions({
        optionI: optionI,
        optionJ: next ? optionI + 1 : optionI - 1,
      })
    );
  };
  return (
    <IconButton
      onClick={onClick}
      disabled={!active || (!next && optionI === 0) || (isLastOption && next)}
    >
      {!next ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
    </IconButton>
  );
};
