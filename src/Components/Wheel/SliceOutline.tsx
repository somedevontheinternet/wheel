import { pieSlice } from "../../utils";

interface SliceProps {
  arc: number;
  sweep: number;
}

export const SliceOutline = ({ arc, sweep }: SliceProps) => {
  return (
    <path
      d={pieSlice([0, 0], [100, 100], [0, sweep - arc], arc)}
      fill="none"
      stroke={"white"}
    />
  );
};
