import { MuiColorInput } from "mui-color-input";
import { useAppDispatch } from "../../redux/hooks";
import { updateOption, useWheelOptionColor } from "../../redux/slices/wheels";
import { WithSxProps } from "../WithSxProps";

type ColorProps = WithSxProps<{
  wheelI: number;
  optionI: number;
}>;

export const Color = ({ wheelI, optionI, sx }: ColorProps) => {
  const color = useWheelOptionColor(wheelI, optionI);
  const dispatch = useAppDispatch();

  const onColorChange = (color: string) =>
    dispatch(
      updateOption({ wheelI: wheelI, optionI: optionI, option: { color } })
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
