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
    renameCurrentWheel(state, action: PayloadAction<string>) {
      const wheel = state.wheels[state.current];
      if (!wheel) return;
      wheel.name = action.payload;
    },

    updateCurrentWheelOption(
      state,
      action: PayloadAction<{
        optionI: number;
        option: Partial<WheelOption>;
      }>
    ) {
      const wheel = state.wheels[state.current];
      if (!wheel) return;
      const option = wheel.options[action.payload.optionI];
      if (!option) return;
      Object.assign(option, action.payload.option);
    },
    deleteCurrentWheelOption(state, action: PayloadAction<number>) {
      const wheel = state.wheels[state.current];
      if (!wheel) return;
      const option = wheel.options[action.payload];
      if (!option) return;
      wheel.options.splice(wheel.options.indexOf(option), 1);
    },
    swapCurrentWheelOptions(
      state,
      action: PayloadAction<{
        optionI: number;
        optionJ: number;
      }>
    ) {
      const { optionI, optionJ } = action.payload;
      const wheel = state.wheels[state.current];
      if (!wheel) return;
      const optI = wheel.options[optionI];
      const optJ = wheel.options[optionJ];
      [optI.label, optJ.label] = [optJ.label, optI.label];
      [optI.weight, optJ.weight] = [optJ.weight, optI.weight];
    },
    addCurrentWheelOption(state) {
      const wheel = state.wheels[state.current];
      if (!wheel) return;
      wheel.options.push({
        label: "New Option",
        weight: 1,
        color: defaultColors[wheel.options.length % defaultColors.length],
        active: true,
      });
    },
    deleteCurrentWheel(state) {
      state.wheels.splice(state.current, 1);
      state.current = Math.min(state.current, state.wheels.length - 1);
    },
    uploadWheels(state, action: PayloadAction<WheelsState>) {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  addWheel,
  renameCurrentWheel,
  updateCurrentWheelOption,
  deleteCurrentWheelOption,
  swapCurrentWheelOptions,
  setCurrentWheel,
  addCurrentWheelOption,
  deleteCurrentWheel,
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

export const selectCurrentActiveWheelOptions = createSelector(
  [(s: RootState) => s.wheels.wheels[s.wheels.current].options],
  (options) => options.filter((o) => o.active)
);

export const useCurrentActiveWheelOptions = () =>
  useAppSelector((s) => selectCurrentActiveWheelOptions(s));

export const useWheelOption = (wheelI: number, optionI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options[optionI]);

export const useCurrentWheelOptionActive = (optionI: number) =>
  useAppSelector(
    (s) => s.wheels.wheels[s.wheels.current].options[optionI].active
  );

export const useCurrentWheelOptionColor = (optionI: number) =>
  useAppSelector(
    (s) => s.wheels.wheels[s.wheels.current].options[optionI].color
  );

export const useCurrentWheelOptionLabel = (optionI: number) =>
  useAppSelector(
    (s) => s.wheels.wheels[s.wheels.current].options[optionI].label
  );

export const useCurrentWheelOptionWeight = (optionI: number) =>
  useAppSelector(
    (s) => s.wheels.wheels[s.wheels.current].options[optionI].weight
  );

export const useWheelOptionCount = (wheelI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options.length);

export const useHasCurrentWheelOption = (optionI: number) =>
  useAppSelector(
    (s) => s.wheels.wheels[s.wheels.current].options.length > optionI
  );

export const useCurrentWheelHasFewActiveOptions = () =>
  useAppSelector(
    (s) =>
      s.wheels.wheels[s.wheels.current].options.filter((o) => o.active).length <
      3
  );

export const useHasFewOptions = (wheelI: number) =>
  useAppSelector((s) => s.wheels.wheels[wheelI].options.length < 3);

export const useCurrentWheelName = () =>
  useAppSelector((s) => s.wheels.wheels[s.wheels.current].name);

export const useIsCurrentWheelLastOption = (optionI: number): boolean =>
  useAppSelector(
    (s) => s.wheels.wheels[s.wheels.current].options.length - 1 === optionI
  );
