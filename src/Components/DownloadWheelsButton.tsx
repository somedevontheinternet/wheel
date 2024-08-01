import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { store } from "../redux/store";

export const DownloadWheelsButton = () => {
  const onClick = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(store.getState().wheels))
    );
    element.setAttribute("download", "wheels.json");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };
  return (
    <IconButton onClick={onClick}>
      <DownloadIcon />
    </IconButton>
  );
};
