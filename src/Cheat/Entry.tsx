import { Box, IconButton, Typography } from "@mui/material";

interface EntryProps {
  enabled: boolean;
  label: string;
  influence: number;
  setInfluence: (i: number) => void;
}

export const Entry = ({
  enabled,
  label,
  influence,
  setInfluence,
}: EntryProps) => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">{label}</Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          disabled={!enabled}
          onClick={() => setInfluence(1e9)}
          sx={{ color: influence === 1e9 ? "green" : undefined }}
        >
          ∞
        </IconButton>
        <IconButton
          disabled={!enabled}
          onClick={() => setInfluence(9)}
          sx={{ color: influence === 9 ? "green" : undefined }}
        >
          9x
        </IconButton>
        <IconButton
          disabled={!enabled}
          onClick={() => setInfluence(6)}
          sx={{ color: influence === 6 ? "green" : undefined }}
        >
          6x
        </IconButton>
        <IconButton
          disabled={!enabled}
          onClick={() => setInfluence(3)}
          sx={{ color: influence === 3 ? "green" : undefined }}
        >
          3x
        </IconButton>
        <IconButton
          disabled={!enabled}
          onClick={() => setInfluence(1)}
          sx={{ color: influence === 1 ? "green" : undefined }}
        >
          1x
        </IconButton>
      </Box>
    </Box>
  );
};
