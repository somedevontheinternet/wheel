import { useCurrentWheelOptionColor } from "../../redux/slices/wheels";
import { pieSlice } from "../../utils";

interface SliceProps {
  optionI: number;
  arc: number;
  sweep: number;
}

export const Slice = ({ optionI, arc, sweep }: SliceProps) => {
  const color = useCurrentWheelOptionColor(optionI);
  return (
    <path
      d={pieSlice([0, 0], [100, 100], [0, sweep - arc], arc)}
      fill={color}
    />
  );
};
