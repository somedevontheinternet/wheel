import { SxProps } from "@mui/material";

export type WithSxProps<T extends object> = T & {
  sx?: SxProps;
};
