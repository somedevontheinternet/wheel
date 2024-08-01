import { useWheelOptionColor } from "../../redux/slices/wheels";
import { invertColor } from "../../utils";

interface TextProps {
  wheelI: number;
  optionI: number;
  rot: number;
  fontSize: number;
  text: string;
}

export const Label = ({ wheelI, optionI, rot, fontSize, text }: TextProps) => {
  const color = useWheelOptionColor(wheelI, optionI);
  return (
    <g transform={`rotate(${rot}) translate(95) scale(-1, 1)`}>
      <text
        fontFamily="Consolas"
        fontSize={`${fontSize}em`}
        fill={invertColor(color)}
      >
        {text}
      </text>
    </g>
  );
};
