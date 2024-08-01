import { Wheel } from "./wheels";

const blue = "#3268e0";
const red = "#d50f26";
const yellow = "#efb319";
const green = "#009928";

export const defaultColors = [blue, red, yellow, green];

export const d20: Wheel = {
  name: "d20",
  options: [
    {
      label: "1",
      weight: 1,
      color: blue,
      active: true,
    },
    {
      label: "11",
      weight: 1,
      color: red,
      active: true,
    },
    {
      label: "2",
      weight: 1,
      color: yellow,
      active: true,
    },
    {
      label: "12",
      weight: 1,
      color: green,
      active: true,
    },
    {
      label: "3",
      weight: 1,
      color: blue,
      active: true,
    },
    {
      label: "13",
      weight: 1,
      color: red,
      active: true,
    },
    {
      label: "4",
      weight: 1,
      color: yellow,
      active: true,
    },
    {
      label: "14",
      weight: 1,
      color: green,
      active: true,
    },
    {
      label: "5",
      weight: 1,
      color: blue,
      active: true,
    },
    {
      label: "15",
      weight: 1,
      color: red,
      active: true,
    },
    {
      label: "6",
      weight: 1,
      color: yellow,
      active: true,
    },
    {
      label: "16",
      weight: 1,
      color: green,
      active: true,
    },
    {
      label: "7",
      weight: 1,
      color: blue,
      active: true,
    },
    {
      label: "17",
      weight: 1,
      color: red,
      active: true,
    },
    {
      label: "8",
      weight: 1,
      color: yellow,
      active: true,
    },
    {
      label: "18",
      weight: 1,
      color: green,
      active: true,
    },
    {
      label: "9",
      weight: 1,
      color: blue,
      active: true,
    },
    {
      label: "19",
      weight: 1,
      color: red,
      active: true,
    },
    {
      label: "10",
      weight: 1,
      color: yellow,
      active: true,
    },
    {
      label: "20",
      weight: 1,
      color: green,
      active: true,
    },
  ],
};

export const names: Wheel = {
  name: "names",
  options: [
    {
      label: "Vernias",
      weight: 1,
      color: blue,
      active: true,
    },
    {
      label: "Nick",
      weight: 1,
      color: green,
      active: true,
    },
    {
      label: "Brent",
      weight: 1,
      color: yellow,
      active: true,
    },
    {
      label: "Sophist",
      weight: 1,
      color: red,
      active: true,
    },
  ],
};

export const gamble: Wheel = {
  name: "Gamble",
  options: [
    { label: "nothing", weight: 5, color: blue, active: true },
    { label: "spin bad wheel", weight: 1, color: red, active: true },
    { label: "spin good wheel", weight: 1, color: yellow, active: true },
    { label: "teleport randomly", weight: 1, color: green, active: true },
    { label: "half your gold", weight: 1, color: blue, active: true },
    { label: "double your gold", weight: 1, color: red, active: true },
  ],
};

export const good: Wheel = {
  name: "Good wheel",
  options: [
    {
      label: "make player spin the bad wheel",
      weight: 1,
      color: blue,
      active: true,
    },
    {
      label: "move anywhere on the board",
      weight: 1,
      color: red,
      active: true,
    },
    { label: "gain a knife", weight: 1, color: yellow, active: true },
    { label: "gain 3 gold", weight: 1, color: green, active: true },
    { label: "free item", weight: 1, color: blue, active: true },
    { label: "spin bad wheel", weight: 1, color: red, active: true },
    { label: "gain 2 gold", weight: 1, color: yellow, active: true },
    { label: "steal 2 gold", weight: 1, color: green, active: true },
    { label: "gain 5 gold", weight: 1, color: blue, active: true },
    { label: "gain 1 gold", weight: 1, color: red, active: true },
    { label: "gain 4 gold", weight: 1, color: yellow, active: true },
  ],
};

export const bad: Wheel = {
  name: "Bad wheel",
  options: [
    {
      label: "swap places with another player",
      weight: 1,
      color: blue,
      active: true,
    },
    { label: "lose half your gold", weight: 1, color: red, active: true },
    { label: "lose 3 gold", weight: 1, color: yellow, active: true },
    { label: "give away an item", weight: 1, color: green, active: true },
    { label: "give away 5 gold", weight: 1, color: blue, active: true },
    { label: "give away 2 gold", weight: 1, color: red, active: true },
    { label: "give away 3 gold", weight: 1, color: yellow, active: true },
    { label: "nick controls your turn", weight: 1, color: green, active: true },
    { label: "nick gets 2 gold", weight: 1, color: blue, active: true },
  ],
};
