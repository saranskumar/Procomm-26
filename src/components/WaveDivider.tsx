"use client";

import { motion } from "framer-motion";

interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}

export default function WaveDivider({ fromColor, toColor, flip = false }: WaveDividerProps) {
  return (
    <div
      className="relative w-full pointer-events-none"
      style={{ backgroundColor: fromColor, stroke: "none", lineHeight: 0, zIndex: 1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ transform: flip ? "scaleX(-1)" : undefined, marginBottom: "-2px" }}
      >
        <motion.path
          d="M0,55 C200,22 400,72 600,45 C800,18 1000,65 1200,38 C1340,18 1400,52 1440,48 L1440,80 L0,80 Z"
          fill={toColor}
          animate={{
            d: [
              "M0,55 C200,22 400,72 600,45 C800,18 1000,65 1200,38 C1340,18 1400,52 1440,48 L1440,80 L0,80 Z",
              "M0,42 C200,65 400,25 600,55 C800,68 1000,28 1200,55 C1340,68 1400,35 1440,60 L1440,80 L0,80 Z",
              "M0,55 C200,22 400,72 600,45 C800,18 1000,65 1200,38 C1340,18 1400,52 1440,48 L1440,80 L0,80 Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,68 C180,52 360,76 540,65 C720,54 900,74 1080,62 C1260,50 1380,70 1440,66 L1440,80 L0,80 Z"
          fill={toColor}
          opacity="0.55"
          animate={{
            d: [
              "M0,68 C180,52 360,76 540,65 C720,54 900,74 1080,62 C1260,50 1380,70 1440,66 L1440,80 L0,80 Z",
              "M0,62 C180,74 360,56 540,70 C720,78 900,58 1080,70 C1260,78 1380,60 1440,72 L1440,80 L0,80 Z",
              "M0,68 C180,52 360,76 540,65 C720,54 900,74 1080,62 C1260,50 1380,70 1440,66 L1440,80 L0,80 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}
