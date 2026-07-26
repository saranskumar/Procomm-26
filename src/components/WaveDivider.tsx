"use client";

import { motion } from "framer-motion";

interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}

export default function WaveDivider({
  fromColor,
  toColor,
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className="relative w-full pointer-events-none overflow-hidden"
      style={{
        backgroundColor: fromColor,
        height: "92px",
        lineHeight: 0,
        zIndex: 1,
        marginTop: "-1.5px",
        marginBottom: "-1.5px",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        {/* Hill Layer 1 — Deepest / lowest opacity */}
        <motion.path
          d="M0,60 C240,25 480,75 720,50 C960,25 1200,65 1440,45 L1440,90 L0,90 Z"
          fill={toColor}
          opacity="0.15"
          animate={{
            d: [
              "M0,60 C240,25 480,75 720,50 C960,25 1200,65 1440,45 L1440,90 L0,90 Z",
              "M0,52 C240,35 480,65 720,56 C960,35 1200,58 1440,52 L1440,90 L0,90 Z",
              "M0,60 C240,25 480,75 720,50 C960,25 1200,65 1440,45 L1440,90 L0,90 Z",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Hill Layer 2 — Middle hill */}
        <motion.path
          d="M0,75 C180,55 360,80 540,70 C720,60 900,78 1080,68 C1260,58 1380,72 1440,70 L1440,90 L0,90 Z"
          fill={toColor}
          opacity="0.35"
          animate={{
            d: [
              "M0,75 C180,55 360,80 540,70 C720,60 900,78 1080,68 C1260,58 1380,72 1440,70 L1440,90 L0,90 Z",
              "M0,70 C180,61 360,73 540,76 C720,66 900,71 1080,74 C1260,64 1380,68 1440,76 L1440,90 L0,90 Z",
              "M0,75 C180,55 360,80 540,70 C720,60 900,78 1080,68 C1260,58 1380,72 1440,70 L1440,90 L0,90 Z",
            ],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Hill Layer 3 — Foreground (solid, transitions directly into the bottom section) */}
        <motion.path
          d="M0,82 C200,65 400,92 600,80 C800,68 1000,88 1200,78 C1340,68 1400,82 1440,80 L1440,90 L0,90 Z"
          fill={toColor}
          animate={{
            d: [
              "M0,82 C200,65 400,92 600,80 C800,68 1000,88 1200,78 C1340,68 1400,82 1440,80 L1440,90 L0,90 Z",
              "M0,78 C200,72 400,85 600,84 C800,75 1000,82 1200,83 C1340,76 1400,78 1440,84 L1440,90 L0,90 Z",
              "M0,82 C200,65 400,92 600,80 C800,68 1000,88 1200,78 C1340,68 1400,82 1440,80 L1440,90 L0,90 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}
