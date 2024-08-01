import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import { renameWheel, setCurrentWheel } from "./redux/slices/wheels";

interface WheelTitleEditorProps {
  wheelI: number;
  name: string;
  onSave: () => void;
}

export const WheelTitleEditor = ({
  wheelI,
  name,
  onSave,
}: WheelTitleEditorProps) => {
  const [value, setValue] = useState(name);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClick = () => {
    dispatch(
      renameWheel({
        i: wheelI,
        name: value,
      })
    );
    dispatch(setCurrentWheel(wheelI));
    onSave();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <>
      <TextField value={value} onChange={onChange} onKeyDown={onKeyDown} />
      <Box>
        <IconButton onClick={onClick} disabled={value === ""}>
          <CheckIcon />
        </IconButton>
      </Box>
    </>
  );
};
