import { Box, Paper, Typography } from "@mui/material";
import { RadToDeg, SVGWheel } from "./Components/Wheel/SVGWheel";
import { useEffect, useState } from "react";
import { WheelOption, useActiveWheelOptions } from "./redux/slices/wheels";
import { setInfluence, setPrimed, useInfluence } from "./redux/slices/cheat";
import { useAppDispatch } from "./redux/hooks";

interface SpinningWheelProps {
  wheelI: number;
}

const startSpeed = 0.2;
const startSlow = Math.PI * 4;
const minSpeed = 0.002;

interface WheelTarget {
  start: number;
  end: number;
  label: string;
}

const createTargetMap = (options: WheelOption[]) => {
  const totalWeight = options.reduce((acc, o) => acc + o.weight, 0);
  const targets: WheelTarget[] = [];
  let cummulativeWeight = 0;
  for (const option of options) {
    const start = (cummulativeWeight / totalWeight) * Math.PI * 2;
    const end =
      ((option.weight + cummulativeWeight) / totalWeight) * Math.PI * 2;
    targets.push({ start: start, end: end, label: option.label });
    cummulativeWeight += option.weight;
  }
  return targets;
};

const findTarget = (
  angle: number,
  targets: WheelTarget[]
): [number, WheelTarget] => {
  angle = angle % (Math.PI * 2);
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (angle > target.start && angle < target.end) {
      return [i, target];
    }
  }
  return [0, targets[0]];
};

const determineSlice = (targets: WheelTarget[], influence: number[]) => {
  const validInfluence = targets.length === influence.length;
  const totalInfluence = validInfluence
    ? influence.reduce((acc, v) => acc + v, 0)
    : targets.reduce((acc, t) => acc + t.end - t.start, 0);
  const arr = validInfluence ? influence : targets.map((t) => t.end - t.start);
  const random = Math.random() * totalInfluence;
  let cummulativeInfluence = 0;
  for (let i = 0; i < targets.length; i++) {
    cummulativeInfluence += arr[i];
    if (random < cummulativeInfluence) return i;
  }
  return 0;
};

export const SpinningWheel = ({ wheelI }: SpinningWheelProps) => {
  const dispatch = useAppDispatch();
  const options = useActiveWheelOptions(wheelI);
  const targets = createTargetMap(options);
  const [angle, setAngle] = useState(0);
  const [target, setTarget] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [currentTargetI, currentTarget] = findTarget(angle, targets);
  const [visible, setVisible] = useState(false);
  const influence = useInfluence();

  const onSpin = () => {
    if (angle !== target) return;
    const targetSlice = determineSlice(targets, influence);
    const extra =
      (targets[targetSlice].end - targets[targetSlice].start) * Math.random();
    const newTarget =
      angle +
      Math.PI * 2 * 3 -
      ((angle + Math.PI * 2 * 3) % (Math.PI * 2)) +
      targets[targetSlice].start +
      extra;
    setTarget(newTarget);
    setSpeed(startSpeed);
    dispatch(setPrimed(false));
    dispatch(setInfluence([]));
  };

  useEffect(() => {
    if (angle === target) return;
    const f = () => {
      const nextAngle = angle + speed;
      if (nextAngle > target) {
        setSpeed(0);
        setAngle(target);
        setVisible(true);
        setTimeout(() => setVisible(false), 2000);
        return;
      }
      setAngle(nextAngle);
      const diff = target - angle;
      if (diff < startSlow) {
        setSpeed(
          startSpeed * Math.max(minSpeed, Math.min(1, diff / startSlow))
        );
      }
    };
    const id = requestAnimationFrame(f);
    return () => cancelAnimationFrame(id);
  }, [angle, speed, target]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <svg onClick={onSpin} height={"70vh"} viewBox="-110 -110 220 220">
        <g transform={`rotate(${RadToDeg(-angle)})`}>
          <SVGWheel wheelI={wheelI} selected={currentTargetI} />
        </g>
        <path d="M -90 0 L -100 10 L -100 -10 Z" stroke="black" fill="white" />
      </svg>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10000000,
          display: visible ? "block" : "none",
        }}
      >
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper sx={{ p: 8 }}>
            <Typography fontSize={100}>{currentTarget.label}</Typography>
          </Paper>
        </div>
      </div>
    </Box>
  );
};
