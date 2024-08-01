import { IconButton } from "@mui/material";
import { useAppDispatch } from "./redux/hooks";
import { addWheel } from "./redux/slices/wheels";
import AddIcon from "@mui/icons-material/Add";
import { defaultColors } from "./redux/slices/wheelsInitial";

export const AddWheelButton = () => {
  const dispatch = useAppDispatch();

  const onAddWheel = () => {
    dispatch(
      addWheel({
        name: `New Wheel`,
        options: [
          {
            label: "Option 1",
            weight: 1,
            color: defaultColors[0],
            active: true,
          },
          {
            label: "Option 2",
            weight: 1,
            color: defaultColors[1],
            active: true,
          },
        ],
      })
    );
  };

  return (
    <IconButton sx={{ mt: 2 }} onClick={onAddWheel}>
      <AddIcon />
    </IconButton>
  );
};
