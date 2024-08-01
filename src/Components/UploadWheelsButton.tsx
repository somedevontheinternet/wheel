import FileUploadIcon from "@mui/icons-material/FileUpload";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { uploadWheels } from "../redux/slices/wheels";

export const UploadWheelsButton = () => {
  const dispatch = useAppDispatch();
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const text = await file.text();
    const state = JSON.parse(text);
    dispatch(uploadWheels(state));
  };
  return (
    <IconButton component="label">
      <FileUploadIcon />
      <input onChange={handleFileUpload} hidden multiple type="file" />
    </IconButton>
  );
};
