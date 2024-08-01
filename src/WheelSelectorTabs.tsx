import { Tab, Tabs } from "@mui/material";
import { useAppDispatch } from "./redux/hooks";
import {
  setCurrentWheel,
  useCurrentWheel,
  useWheelHeader,
} from "./redux/slices/wheels";

export const WheelSelectorTabs = () => {
  const i = useCurrentWheel();
  const dispatch = useAppDispatch();
  const wheels = useWheelHeader();

  return (
    <Tabs
      sx={{ borderRight: 1, borderColor: "divider" }}
      value={i}
      onChange={(_, v) => dispatch(setCurrentWheel(v))}
      orientation="vertical"
      variant="scrollable"
    >
      {wheels.map((wheel, i) => (
        <Tab key={i} value={i} label={wheel} />
      ))}
    </Tabs>
  );
};
