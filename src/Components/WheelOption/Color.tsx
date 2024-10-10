import { MuiColorInput } from "mui-color-input";
import { useAppDispatch } from "../../redux/hooks";
import {
  updateCurrentWheelOption,
  useCurrentWheelOptionColor,
} from "../../redux/slices/wheels";
import { WithSxProps } from "../WithSxProps";

type ColorProps = WithSxProps<{
  optionI: number;
}>;

export const Color = ({ optionI, sx }: ColorProps) => {
  const color = useCurrentWheelOptionColor(optionI);
  const dispatch = useAppDispatch();

  const onColorChange = (color: string) =>
    dispatch(
      updateCurrentWheelOption({
        optionI: optionI,
        option: { color },
      })
    );

  return (
    <MuiColorInput
      sx={sx}
      format="hex"
      value={color}
      onChange={onColorChange}
    />
  );
};
