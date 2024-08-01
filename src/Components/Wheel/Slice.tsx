import { useWheelOptionColor } from "../../redux/slices/wheels";
import { pieSlice } from "../../utils";

interface SliceProps {
  wheelI: number;
  optionI: number;
  arc: number;
  sweep: number;
}

export const Slice = ({ wheelI, optionI, arc, sweep }: SliceProps) => {
  const color = useWheelOptionColor(wheelI, optionI);
  return (
    <path
      d={pieSlice([0, 0], [100, 100], [0, sweep - arc], arc)}
      fill={color}
    />
  );
};
