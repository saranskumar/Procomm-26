"use client";

import { motion } from "framer-motion";

type Scene = "cosmic" | "hills" | "flowlines" | "topographic" | "waves" | "brushwork";

interface IllustrationLayerProps {
  scene: Scene;
  className?: string;
  opacity?: number;
  color?: string;
  animated?: boolean;
}

// ─── Scene renderers (no particle circles) ───────────────────────────────────

function SceneCosmic({ color, animated }: { color: string; animated?: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Floating planet */}
      <motion.g
        animate={animated ? { y: [0, -18, 0], rotate: [0, 4, 0] } : {}}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "650px", originY: "120px" }}
      >
        <circle cx="650" cy="120" r="58" stroke={color} strokeWidth="0.7" fill="none" />
        <ellipse cx="650" cy="120" rx="82" ry="15" stroke={color} strokeWidth="0.45" strokeDasharray="5 6" fill="none" />
        <circle cx="650" cy="120" r="24" fill="none" stroke={color} strokeWidth="0.55" />
        <path d="M 625 108 Q 650 100 675 112" stroke={color} strokeWidth="0.4" fill="none" opacity="0.5" />
        <path d="M 630 130 Q 650 140 670 128" stroke={color} strokeWidth="0.35" fill="none" opacity="0.4" />
      </motion.g>

      {/* Crescent moon */}
      <motion.g
        animate={animated ? { y: [0, 12, 0], rotate: [0, -3, 0] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ originX: "120px", originY: "200px" }}
      >
        <path d="M 120 158 A 42 42 0 1 1 120 242 A 28 28 0 1 0 120 158" fill={color} opacity="0.14" />
        <circle cx="120" cy="200" r="42" stroke={color} strokeWidth="0.55" fill="none" />
        <circle cx="120" cy="200" r="28" stroke={color} strokeWidth="0.3" strokeDasharray="3 4" fill="none" />
      </motion.g>

      {/* Organic flowing lines (replace stars) */}
      {[80, 200, 320, 500, 680, 720].map((x, i) => (
        <motion.path
          key={i}
          d={`M ${x} ${40 + i * 60} Q ${x + 50} ${20 + i * 55} ${x + 100} ${45 + i * 58}`}
          stroke={color}
          strokeWidth="0.4"
          fill="none"
          opacity={0.2 - i * 0.02}
          animate={animated ? { opacity: [0.08, 0.22, 0.08] } : {}}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
        />
      ))}
    </svg>
  );
}

function SceneHills({ color, animated }: { color: string; animated?: boolean }) {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0,240 C200,160 400,220 600,180 C800,140 1000,200 1200,165 C1350,140 1420,175 1440,170 L1440,320 L0,320 Z"
        fill={color}
        opacity={0.09}
        animate={animated ? {
          d: [
            "M0,240 C200,160 400,220 600,180 C800,140 1000,200 1200,165 C1350,140 1420,175 1440,170 L1440,320 L0,320 Z",
            "M0,258 C200,180 400,238 600,196 C800,156 1000,215 1200,180 C1350,156 1420,185 1440,186 L1440,320 L0,320 Z",
            "M0,240 C200,160 400,220 600,180 C800,140 1000,200 1200,165 C1350,140 1420,175 1440,170 L1440,320 L0,320 Z",
          ],
        } : {}}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,278 C180,230 380,265 580,250 C780,235 1050,260 1280,245 C1380,238 1420,252 1440,255 L1440,320 L0,320 Z"
        fill={color}
        opacity={0.06}
        animate={animated ? {
          d: [
            "M0,278 C180,230 380,265 580,250 C780,235 1050,260 1280,245 C1380,238 1420,252 1440,255 L1440,320 L0,320 Z",
            "M0,268 C180,248 380,255 580,262 C780,246 1050,248 1280,258 C1380,252 1420,240 1440,262 L1440,320 L0,320 Z",
            "M0,278 C180,230 380,265 580,250 C780,235 1050,260 1280,245 C1380,238 1420,252 1440,255 L1440,320 L0,320 Z",
          ],
        } : {}}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <path d="M0,300 C200,285 400,298 600,292 C800,284 1050,296 1280,290 C1380,284 1420,292 1440,294 L1440,320 L0,320 Z"
        fill={color} opacity={0.035} />
      {/* Contour lines */}
      <motion.path
        d="M-50,215 C200,148 450,198 700,168 C950,138 1150,182 1440,155"
        stroke={color} strokeWidth="0.5" opacity={0.06}
        animate={animated ? { d: [
          "M-50,215 C200,148 450,198 700,168 C950,138 1150,182 1440,155",
          "M-50,225 C200,162 450,208 700,180 C950,152 1150,192 1440,168",
          "M-50,215 C200,148 450,198 700,168 C950,138 1150,182 1440,155",
        ]} : {}}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function SceneFlowlines({ color }: { color: string }) {
  // Flowing organic line field — replaces particle scatter
  const lines = [
    { x1: 50, y1: 80, cx1: 200, cy1: 40, cx2: 350, cy2: 110, x2: 500, y2: 70 },
    { x1: 100, y1: 200, cx1: 280, cy1: 150, cx2: 450, cy2: 230, x2: 620, y2: 190 },
    { x1: 20, y1: 350, cx1: 220, cy1: 300, cx2: 430, cy2: 400, x2: 650, y2: 340 },
    { x1: 300, y1: 480, cx1: 480, cy1: 430, cx2: 650, cy2: 510, x2: 800, y2: 460 },
    { x1: 600, y1: 100, cx1: 750, cy1: 60, cx2: 850, cy2: 140, x2: 780, y2: 200 },
    { x1: 650, y1: 320, cx1: 700, cy1: 280, cx2: 760, cy2: 360, x2: 730, y2: 420 },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {lines.map((l, i) => (
        <motion.path
          key={i}
          d={`M ${l.x1} ${l.y1} C ${l.cx1} ${l.cy1} ${l.cx2} ${l.cy2} ${l.x2} ${l.y2}`}
          stroke={color}
          strokeWidth={0.5 + (i % 3) * 0.2}
          fill="none"
          opacity={0.15 - i * 0.01}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.12 - i * 0.008 }}
          transition={{ duration: 2.5 + i * 0.4, delay: i * 0.3, ease: "easeOut" }}
        />
      ))}
      {/* Ink-bleed brush stroke shapes */}
      {[[180, 160], [480, 280], [680, 180], [300, 420]].map(([cx, cy], i) => (
        <motion.ellipse
          key={i}
          cx={cx} cy={cy}
          rx={30 + i * 10} ry={6 + i * 2}
          fill={color}
          opacity={0}
          animate={{ opacity: [0, 0.04, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, delay: i * 1.2, ease: "easeInOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </svg>
  );
}

function SceneTopographic({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="0.6" opacity="0.15">
        <ellipse cx="400" cy="300" rx="350" ry="160" />
        <ellipse cx="400" cy="300" rx="300" ry="125" />
        <ellipse cx="400" cy="300" rx="250" ry="95" />
        <ellipse cx="400" cy="300" rx="200" ry="70" />
        <ellipse cx="400" cy="300" rx="150" ry="50" />
        <ellipse cx="400" cy="300" rx="100" ry="32" />
        <ellipse cx="400" cy="300" rx="55" ry="18" />
        <ellipse cx="400" cy="300" rx="22" ry="8" />
      </g>
      <g stroke={color} strokeWidth="0.4" opacity="0.07">
        <ellipse cx="180" cy="150" rx="180" ry="90" />
        <ellipse cx="180" cy="150" rx="140" ry="65" />
        <ellipse cx="180" cy="150" rx="100" ry="44" />
        <ellipse cx="680" cy="480" rx="160" ry="80" />
        <ellipse cx="680" cy="480" rx="120" ry="55" />
      </g>
    </svg>
  );
}

function SceneWaves({ color }: { color: string }) {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0,50 C120,20 240,80 360,50 C480,20 600,80 720,50 C840,20 960,80 1080,50 C1200,20 1320,80 1440,50 L1440,100 L0,100 Z"
        fill={color}
        opacity="0.07"
        animate={{
          d: [
            "M0,50 C120,20 240,80 360,50 C480,20 600,80 720,50 C840,20 960,80 1080,50 C1200,20 1320,80 1440,50 L1440,100 L0,100 Z",
            "M0,40 C120,68 240,22 360,55 C480,72 600,18 720,56 C840,68 960,22 1080,60 C1200,68 1320,22 1440,40 L1440,100 L0,100 Z",
            "M0,50 C120,20 240,80 360,50 C480,20 600,80 720,50 C840,20 960,80 1080,50 C1200,20 1320,80 1440,50 L1440,100 L0,100 Z",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,65 C120,40 240,88 360,65 C480,40 600,88 720,65 C840,40 960,88 1080,65 C1200,40 1320,88 1440,65 L1440,100 L0,100 Z"
        fill={color}
        opacity="0.05"
        animate={{
          d: [
            "M0,65 C120,40 240,88 360,65 C480,40 600,88 720,65 C840,40 960,88 1080,65 C1200,40 1320,88 1440,65 L1440,100 L0,100 Z",
            "M0,58 C120,80 240,42 360,72 C480,82 600,44 720,68 C840,82 960,44 1080,72 C1200,78 1320,44 1440,55 L1440,100 L0,100 Z",
            "M0,65 C120,40 240,88 360,65 C480,40 600,88 720,65 C840,40 960,88 1080,65 C1200,40 1320,88 1440,65 L1440,100 L0,100 Z",
          ],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </svg>
  );
}

function SceneBrushwork({ color }: { color: string }) {
  // Loose painterly ink marks — no particles, just expressive strokes
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Long flowing brush marks */}
      {[
        "M 20 150 Q 120 100 250 165 Q 380 220 460 180",
        "M 300 50 Q 420 20 560 80 Q 660 120 700 100",
        "M 0 380 Q 150 340 300 395 Q 480 440 620 410",
        "M 500 250 Q 600 210 720 268 Q 780 290 800 278",
        "M 80 520 Q 200 490 360 525 Q 520 560 680 530",
        "M 150 280 Q 280 250 400 290 Q 520 325 580 305",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={1 + (i % 3) * 0.5}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.08 - i * 0.006 }}
          transition={{ duration: 1.8 + i * 0.3, delay: i * 0.25, ease: [0.22, 0.61, 0.36, 1] }}
        />
      ))}
      {/* Ink splash accent */}
      <motion.path
        d="M 680 80 Q 720 60 740 90 Q 760 115 730 120 Q 700 125 685 105 Z"
        fill={color}
        opacity={0}
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function IllustrationLayer({
  scene,
  className = "",
  opacity = 1,
  color = "var(--ink-mid)",
  animated = false,
}: IllustrationLayerProps) {
  const scenes: Record<Scene, React.ReactNode> = {
    cosmic:       <SceneCosmic color={color} animated={animated} />,
    hills:        <SceneHills color={color} animated={animated} />,
    flowlines:    <SceneFlowlines color={color} />,
    topographic:  <SceneTopographic color={color} />,
    waves:        <SceneWaves color={color} />,
    brushwork:    <SceneBrushwork color={color} />,
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {scenes[scene]}
    </div>
  );
}
