import { configureStore } from "@reduxjs/toolkit";
import { wheelsReducer } from "./slices/wheels";
import { cheatReducer } from "./slices/cheat";

export const store = configureStore({
  reducer: {
    wheels: wheelsReducer,
    cheat: cheatReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
