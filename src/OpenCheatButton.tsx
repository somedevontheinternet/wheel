import { IconButton } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { useContext } from "react";
import { CheatContext } from "./CheatContext";

const cheatWindowParams = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=600,left=100,top=100`;

export const OpenCheatButton = () => {
  const cheat = useContext(CheatContext);
  return (
    <IconButton
      onClick={() => {
        const win = window.open("/?cheat=true", "cheat", cheatWindowParams);
        if (!win) {
          console.error("Failed to open window");
          return;
        }
        cheat.setActiveWindow({ win, ready: false });
      }}
    >
      <CasinoIcon />
    </IconButton>
  );
};
