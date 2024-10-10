import { useCurrentWheelOptionColor } from "../../redux/slices/wheels";
import { invertColor } from "../../utils";

interface TextProps {
  optionI: number;
  rot: number;
  fontSize: number;
  text: string;
}

export const Label = ({ optionI, rot, fontSize, text }: TextProps) => {
  const color = useCurrentWheelOptionColor(optionI);
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
