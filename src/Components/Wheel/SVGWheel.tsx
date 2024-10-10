import { useCurrentActiveWheelOptions } from "../../redux/slices/wheels";
import { Slice } from "./Slice";
import { Label } from "./Label";
import { SliceOutline } from "./SliceOutline";

interface SVGWheelProps {
  selected: number;
}

export const RadToDeg = (rad: number) => (rad * 180) / Math.PI;

const resizeText = (text: string): [number, string] => {
  if (text.length > 20) {
    return [8 / 20, text.slice(0, 17) + "..."];
  }
  if (text.length > 12) {
    return [8 / text.length, text];
  }
  return [1, text];
};

export const SVGWheel = ({ selected }: SVGWheelProps) => {
  const options = useCurrentActiveWheelOptions();
  const totalWeight = options.reduce((acc, o) => acc + o.weight, 0);
  const slices: JSX.Element[] = [];
  const texts: JSX.Element[] = [];
  const highlighted: JSX.Element[] = [];
  let cummulativeWeight = 0;
  for (let i = options.length - 1; i >= 0; i--) {
    const option = options[i];
    // pie slice
    const arc = (cummulativeWeight / totalWeight) * Math.PI * 2;
    const sweep =
      ((cummulativeWeight + option.weight) / totalWeight) * Math.PI * 2;
    slices.push(<Slice key={i} optionI={i} arc={arc} sweep={sweep} />);

    if (i === selected) {
      highlighted.push(<SliceOutline key={i} arc={arc} sweep={sweep} />);
    }

    // text
    const middle =
      ((cummulativeWeight + option.weight / 2) / totalWeight) * Math.PI * 2;

    const [fontSize, text] = resizeText(option.label);
    const rx = ((16 * fontSize) / 100) * Math.PI * 2;
    const rot = RadToDeg(middle) + rx;
    texts.push(
      <Label key={i} optionI={i} rot={rot} fontSize={fontSize} text={text} />
    );

    cummulativeWeight += option.weight;
  }
  return (
    <g transform={`rotate(${0})`}>
      <g transform="scale(-1, 1)">
        {slices}
        {texts}
        {highlighted}
      </g>
    </g>
  );
};
