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
        height: "80px",
        lineHeight: 0,
        zIndex: 1,
        marginTop: "-1px",
        marginBottom: "-1px",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        {/* Subtle accent crest stroke echo */}
        <motion.path
          d="M0,32 C280,5 560,65 840,25 C1120,-5 1320,45 1440,30"
          fill="none"
          stroke={toColor}
          strokeWidth="2"
          opacity="0.3"
          animate={{
            d: [
              "M0,32 C280,5 560,65 840,25 C1120,-5 1320,45 1440,30",
              "M0,22 C280,55 560,15 840,45 C1120,25 1320,10 1440,40",
              "M0,32 C280,5 560,65 840,25 C1120,-5 1320,45 1440,30",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Primary 100% solid Bezier wave path */}
        <motion.path
          d="M0,42 C280,15 560,72 840,35 C1120,5 1320,55 1440,40 L1440,80 L0,80 Z"
          fill={toColor}
          animate={{
            d: [
              "M0,42 C280,15 560,72 840,35 C1120,5 1320,55 1440,40 L1440,80 L0,80 Z",
              "M0,32 C280,62 560,22 840,52 C1120,32 1320,20 1440,48 L1440,80 L0,80 Z",
              "M0,42 C280,15 560,72 840,35 C1120,5 1320,55 1440,40 L1440,80 L0,80 Z",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

