import { useHasCurrentWheelOption } from "./redux/slices/wheels";
import { WheelOption } from "./WheelOption";

interface RecursiveWheelOptionProps {
  optionI: number;
}

export const RecursiveWheelOption = ({
  optionI,
}: RecursiveWheelOptionProps) => {
  const hasOption = useHasCurrentWheelOption(optionI);
  if (!hasOption) return <></>;

  return (
    <>
      <WheelOption optionI={optionI} />
      <RecursiveWheelOption optionI={optionI + 1} />
    </>
  );
};
