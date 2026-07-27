"use client";

import { motion } from "framer-motion";
import { useId } from "react";

interface SatelliteProps {
  size?: number | string;
  className?: string;
  animateFloat?: boolean;
  floatDuration?: number;
  rotation?: number;
}

export default function Satellite({
  size = 220,
  className = "",
  animateFloat = true,
  floatDuration = 12,
  rotation = -20,
}: SatelliteProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "_");

  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      fill="none"
      className={`select-none ${className}`}
    >
      <defs>
        <linearGradient id={`satSolarGrad_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--moss)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--teal-soft)" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id={`satDishGrad_${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--ochre)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--ink-deep)" stopOpacity="0.9" />
        </radialGradient>
      </defs>

      <g transform={`translate(100, 100) rotate(${rotation})`}>
        {/* Solar Panel Wings - Left */}
        <g transform="translate(-78, -12)">
          <rect x="0" y="0" width="54" height="24" rx="2" fill={`url(#satSolarGrad_${uid})`} stroke="var(--ochre)" strokeWidth="1.2" />
          <line x1="18" y1="0" x2="18" y2="24" stroke="var(--ochre)" strokeWidth="0.6" opacity="0.75" />
          <line x1="36" y1="0" x2="36" y2="24" stroke="var(--ochre)" strokeWidth="0.6" opacity="0.75" />
          <line x1="0" y1="12" x2="54" y2="12" stroke="var(--ochre)" strokeWidth="0.6" opacity="0.75" />
          <circle cx="3" cy="3" r="1" fill="var(--ochre)" />
          <circle cx="51" cy="3" r="1" fill="var(--ochre)" />
          <circle cx="3" cy="21" r="1" fill="var(--ochre)" />
          <circle cx="51" cy="21" r="1" fill="var(--ochre)" />
        </g>

        {/* Solar Panel Wings - Right */}
        <g transform="translate(24, -12)">
          <rect x="0" y="0" width="54" height="24" rx="2" fill={`url(#satSolarGrad_${uid})`} stroke="var(--ochre)" strokeWidth="1.2" />
          <line x1="18" y1="0" x2="18" y2="24" stroke="var(--ochre)" strokeWidth="0.6" opacity="0.75" />
          <line x1="36" y1="0" x2="36" y2="24" stroke="var(--ochre)" strokeWidth="0.6" opacity="0.75" />
          <line x1="0" y1="12" x2="54" y2="12" stroke="var(--ochre)" strokeWidth="0.6" opacity="0.75" />
          <circle cx="3" cy="3" r="1" fill="var(--ochre)" />
          <circle cx="51" cy="3" r="1" fill="var(--ochre)" />
          <circle cx="3" cy="21" r="1" fill="var(--ochre)" />
          <circle cx="51" cy="21" r="1" fill="var(--ochre)" />
        </g>

        {/* Panel Yoke Connectors */}
        <rect x="-24" y="-3" width="12" height="6" fill="var(--ink-deep)" stroke="var(--ochre)" strokeWidth="1" />
        <rect x="12" y="-3" width="12" height="6" fill="var(--ink-deep)" stroke="var(--ochre)" strokeWidth="1" />
        <line x1="-24" y1="0" x2="-12" y2="0" stroke="var(--star-glow)" strokeWidth="1.5" />
        <line x1="12" y1="0" x2="24" y2="0" stroke="var(--star-glow)" strokeWidth="1.5" />

        {/* Main Satellite Central Bus */}
        <rect x="-14" y="-18" width="28" height="36" rx="3" fill="var(--ink-deep)" stroke="var(--ochre)" strokeWidth="1.5" />
        <rect x="-11" y="-15" width="22" height="30" rx="1.5" fill="none" stroke="var(--ochre)" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.85" />
        
        {/* Optical Lens & Telemetry Sensor */}
        <circle cx="0" cy="-6" r="4.5" fill="var(--ochre)" stroke="var(--ivory)" strokeWidth="0.8" />
        <circle cx="0" cy="-6" r="2" fill="var(--ink-deep)" />

        {/* Status LEDs */}
        <circle cx="8" cy="-12" r="1.5" fill="var(--rust)" />
        <circle cx="-8" cy="-12" r="1.5" fill="var(--lavender)" />

        {/* RCS Thrusters */}
        <polygon points="-14,-12 -18,-15 -18,-9" fill="var(--ochre)" />
        <polygon points="14,-12 18,-15 18,-9" fill="var(--ochre)" />

        {/* Main High-Gain Parabolic Communications Dish */}
        <g transform="translate(0, 18)">
          <line x1="-4" y1="0" x2="-8" y2="14" stroke="var(--ochre)" strokeWidth="1.2" />
          <line x1="4" y1="0" x2="8" y2="14" stroke="var(--ochre)" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="0" y2="14" stroke="var(--star-glow)" strokeWidth="1.5" />

          <path d="M-18,14 C-10,3 10,3 18,14" fill={`url(#satDishGrad_${uid})`} stroke="var(--ochre)" strokeWidth="1.5" />
          <line x1="-12" y1="12" x2="0" y2="24" stroke="var(--ochre)" strokeWidth="0.8" opacity="0.8" />
          <line x1="12" y1="12" x2="0" y2="24" stroke="var(--ochre)" strokeWidth="0.8" opacity="0.8" />
          <line x1="0" y1="14" x2="0" y2="24" stroke="var(--ochre)" strokeWidth="1" />
          
          <circle cx="0" cy="24" r="2.5" fill="var(--ochre)" stroke="var(--ivory)" strokeWidth="0.6" />
        </g>

        {/* Top Omnidirectional Antenna */}
        <g transform="translate(0, -18)">
          <line x1="0" y1="0" x2="0" y2="-12" stroke="var(--ochre)" strokeWidth="1.2" />
          <circle cx="0" cy="-12" r="2" fill="var(--star-glow)" />
          <line x1="-4" y1="-8" x2="4" y2="-8" stroke="var(--ochre)" strokeWidth="0.8" />
        </g>
      </g>
    </svg>
  );

  if (!animateFloat) return svgContent;

  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
    >
      {svgContent}
    </motion.div>
  );
}
