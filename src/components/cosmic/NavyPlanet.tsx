"use client";

import { motion } from "framer-motion";
import { useId } from "react";

interface NavyPlanetProps {
  size?: number | string;
  className?: string;
  animateFloat?: boolean;
  floatDuration?: number;
  rotation?: number;
}

export default function NavyPlanet({
  size = 240,
  className = "",
  animateFloat = true,
  floatDuration = 20,
  rotation = -12,
}: NavyPlanetProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "_");

  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Deep navy radial gradient */}
        <radialGradient id={`prBody_${uid}`} cx="34%" cy="30%" r="58%">
          <stop offset="0%" stopColor="#4a70a8" stopOpacity="1" />
          <stop offset="30%" stopColor="#1e3d6a" stopOpacity="1" />
          <stop offset="65%" stopColor="#0d2040" stopOpacity="1" />
          <stop offset="100%" stopColor="#060e20" stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`prSpec_${uid}`} cx="30%" cy="25%" r="20%">
          <stop offset="0%" stopColor="#a0c0e8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#a0c0e8" stopOpacity="0" />
        </radialGradient>
        {/* Clip path to only draw the front half of the ring (bottom half) */}
        <clipPath id={`prFrontClip_${uid}`}>
          <rect x="0" y="120" width="240" height="120" />
        </clipPath>
      </defs>
      <g transform={`rotate(${rotation}, 120, 120)`}>
        {/* Subtle glow behind planet */}
        <circle cx="120" cy="120" r="85" fill="#1e3d6a" opacity="0.04" />
        
        {/* 1. Orbit ring BACK (behind planet body) */}
        <ellipse cx="120" cy="120" rx="108" ry="15" fill="none" stroke="#6888b8" strokeWidth="1" strokeDasharray="8 5" opacity="0.22" />
        
        {/* 2. Planet body */}
        <circle cx="120" cy="120" r="62" fill={`url(#prBody_${uid})`} />
        
        {/* Specular */}
        <circle cx="120" cy="120" r="62" fill={`url(#prSpec_${uid})`} />
        
        {/* 3. Orbit ring FRONT (drawn on top of planet body) */}
        <ellipse cx="120" cy="120" rx="108" ry="15" fill="none" stroke="#7898c8" strokeWidth="1.2" strokeDasharray="8 5" opacity="0.4" clipPath={`url(#prFrontClip_${uid})`} />
      </g>
    </svg>
  );

  if (!animateFloat) return svgContent;

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
    >
      {svgContent}
    </motion.div>
  );
}
