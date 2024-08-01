import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";

export interface CheatState {
  values: number[];
  primed: boolean;
}

export const initialState: CheatState = {
  values: [],
  primed: false,
};

const slice = createSlice({
  name: "cheat",
  initialState,
  reducers: {
    setInfluence(state, action: PayloadAction<number[]>) {
      state.values = action.payload;
    },
    setPrimed(state, action: PayloadAction<boolean>) {
      state.primed = action.payload;
    },
  },
});

export const { setInfluence, setPrimed } = slice.actions;
export const cheatReducer = slice.reducer;

export const useInfluence = () => useAppSelector((s) => s.cheat.values);

export const usePrimed = () => useAppSelector((s) => s.cheat.primed);
