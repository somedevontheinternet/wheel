import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";
import { shallowEqual } from "react-redux";
import { bad, d20, defaultColors, gamble, good, names } from "./wheelsInitial";

export interface WheelOption {
  label: string;
  weight: number;
  color: string;
  active: boolean;
}

export interface Wheel {
  name: string;
  options: WheelOption[];
}

export interface WheelsState {
  current: number;
  wheels: Wheel[];
}

export const initialState: WheelsState = {
  current: 0,
  wheels: [names, d20, gamble, good, bad],
};

const wheelsSlice = createSlice({
  name: "wheels",
  initialState,
  reducers: {
    setCurrentWheel(state, action: PayloadAction<number>) {
      state.current = action.payload;
    },
    addWheel(state, action: PayloadAction<Omit<Wheel, "id">>) {
      const newWheel = { ...action.payload, id: uuidv4() };
      state.wheels.push(newWheel);
    },
    renameWheel(state, action: PayloadAction<{ i: number; name: string }>) {
      const wheel = state.wheels[action.payload.i];
      if (!wheel) return;
      wheel.name = action.payload.name;
    },

    updateOption(
      state,
      action: PayloadAction<{
        wheelI: number;
        optionI: number;
        option: Partial<WheelOption>;
      }>
    ) {
      const wheel = state.wheels[action.payload.wheelI];
      if (!wheel) return;
      const option = wheel.options[action.payload.optionI];
      if (!option) return;
      Object.assign(option, action.payload.option);
    },
    deleteOption(
      state,
      action: PayloadAction<{ wheelI: number; optionI: number }>
    ) {
      const wheel = state.wheels[action.payload.wheelI];
      if (!wheel) return;
      const option = wheel.options[action.payload.optionI];
      if (!option) return;
      wheel.options.splice(wheel.options.indexOf(option), 1);
    },
    swapOptions(
      state,
      action: PayloadAction<{
        wheelI: number;
        optionI: number;
        optionJ: number;
      }>
    ) {
      const { wheelI, optionI, optionJ } = action.payload;
      const wheel = state.wheels[wheelI];
      if (!wheel) return;
      const optI = wheel.options[optionI];
      const optJ = wheel.options[optionJ];
      [optI.label, optJ.label] = [optJ.label, optI.label];
      [optI.weight, optJ.weight] = [optJ.weight, optI.weight];
    },
    addWheelOption(state, action: PayloadAction<{ wheelI: number }>) {
      const wheel = state.wheels[action.payload.wheelI];
      if (!wheel) return;
      wheel.options.push({
        label: "New Option",
        weight: 1,
        color: defaultColors[wheel.options.length % defaultColors.length],
        active: true,
      });
    },
    deleteWheel(state, action: PayloadAction<number>) {
      state.wheels.splice(action.payload, 1);
      state.current = Math.min(state.current, state.wheels.length - 1);
    },
    uploadWheels(state, action: PayloadAction<WheelsState>) {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  addWheel,
  renameWheel,
  updateOption,
  deleteOption,
  swapOptions,
  setCurrentWheel,
  addWheelOption,
  deleteWheel,
  uploadWheels,
} = wheelsSlice.actions;
export const wheelsReducer = wheelsSlice.reducer;

export const useCurrentWheel = (): number =>
  useAppSelector((s) => s.wheels.current);
export const useAllWheels = () => useAppSelector((s) => s.wheels.wheels);

const selectWheelHeader = createSelector(
  [(s: RootState) => s.wheels.wheels],
  (wheels) => wheels.map((w) => w.name),
  {
    memoizeOptions: {
      resultEqualityCheck: shallowEqual,
    },
  }
);

export const useWheelHeader = () => useAppSelector(selectWheelHeader);

export const useWheel = (i: number) =>
  useAppSelector((s) => s.wheels.wheels[i]);

export const selectActiveWheelOptions = createSelector(
  [(s: RootState, wheelI: number) => s.wheels.wheels[wheelI].options],
  (options) => options.filter((o) => o.active)
);

export const useActiveWheelOptions = (wheelI: number) =>
  useAppSelector((s) => selectActiveWheelOptions(s, wheelI));

export const useWheelOption = (wheelI: number, optionI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options[optionI]);

export const useWheelOptionActive = (wheelI: number, optionI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options[optionI].active);

export const useWheelOptionColor = (wheelI: number, optionI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options[optionI].color);

export const useWheelOptionLabel = (wheelI: number, optionI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options[optionI].label);

export const useWheelOptionWeight = (wheelI: number, optionI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options[optionI].weight);

export const useWheelOptionCount = (wheelI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options.length);

export const useHasFewActiveOptions = (wheelI: number) =>
  useAppSelector(
    (s) => s.wheels.wheels[wheelI].options.filter((o) => o.active).length < 3
  );

export const useHasFewOptions = (wheelI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options.length < 3);

export const useWheelName = (i: number) =>
  useAppSelector((s) => s.wheels.wheels[i].name);
