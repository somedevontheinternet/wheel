import { WheelOption } from "../redux/slices/wheels";

export const sendMessage = (win: Window, msg: Message<unknown>) => {
  win.postMessage(msg, "*");
};

interface PotentialHandlers {
  readyWindow?: () => void;
  updateInfluence?: (values: number[]) => void;
  updateWheelOptions?: (options: WheelOption[]) => void;
  keepAlive?: () => void;
  prime?: (p: boolean) => void;
  closeWindow?: () => void;
}

export const makeMessageHandler = (p: PotentialHandlers) => (e: MessageEvent) =>
  p[e.data.type as keyof PotentialHandlers]?.(e.data.data);

export type Message<T> = {
  type: string;
  data?: T;
};

// ready
export interface ReadyWindowMessage extends Message<void> {
  type: "readyWindow";
}

export const isReadyWindowMessage = (
  message: Message<unknown>
): message is ReadyWindowMessage => message.type === "readyWindow";

export const createReadyWindowMessage = (): ReadyWindowMessage => ({
  type: "readyWindow",
});

// influence
export interface UpdateInfluenceMessage extends Message<number[]> {
  type: "updateInfluence";
  data: number[];
}

export const isUpdateInfluenceMessage = (
  message: Message<unknown>
): message is UpdateInfluenceMessage => message.type === "updateInfluence";

export const createUpdateInfluenceMessage = (
  values: number[]
): UpdateInfluenceMessage => ({
  type: "updateInfluence",
  data: values,
});

// options
export interface UpdateWheelOptionsMessage extends Message<WheelOption[]> {
  type: "updateWheelOptions";
  data: WheelOption[];
}

export const isUpdateWheelOptionsMessage = (
  message: Message<unknown>
): message is UpdateWheelOptionsMessage =>
  message.type === "updateWheelOptions";

export const createUpdateWheelOptionsMessage = (options: WheelOption[]) => ({
  type: "updateWheelOptions",
  data: options,
});

// keep alive
export interface KeepAliveMessage extends Message<void> {
  type: "keepAlive";
}
export const isKeepAliveMessage = (
  message: Message<unknown>
): message is KeepAliveMessage => message.type === "keepAlive";

export const createKeepAliveMessage = (): KeepAliveMessage => ({
  type: "keepAlive",
});

// prime
export interface PrimeMessage extends Message<boolean> {
  type: "prime";
  data: boolean;
}

export const isPrimeMessage = (
  message: Message<unknown>
): message is PrimeMessage => message.type === "prime";

export const createPrimeMessage = (primed: boolean): PrimeMessage => ({
  type: "prime",
  data: primed,
});

// close window
export interface CloseWindowMessage extends Message<void> {
  type: "closeWindow";
}

export const isCloseWindowMessage = (
  message: Message<unknown>
): message is CloseWindowMessage => message.type === "closeWindow";

export const createCloseWindowMessage = (): CloseWindowMessage => ({
  type: "closeWindow",
});
