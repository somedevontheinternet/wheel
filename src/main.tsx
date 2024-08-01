import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { CheatWindow } from "./Cheat/CheatWindow.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cheat = urlParams.get("cheat") === "true";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>{cheat ? <CheatWindow /> : <App />}</Provider>
    </ThemeProvider>
  </React.StrictMode>
);
