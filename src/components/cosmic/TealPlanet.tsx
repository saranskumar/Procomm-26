"use client";

import { motion } from "framer-motion";
import { useId } from "react";

interface TealPlanetProps {
  size?: number | string;
  className?: string;
  animateFloat?: boolean;
  floatDuration?: number;
  rotation?: number;
}

export default function TealPlanet({
  size = 130,
  className = "",
  animateFloat = true,
  floatDuration = 14,
  rotation = -15,
}: TealPlanetProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "_");

  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      fill="none"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Teal-blue gradient */}
        <radialGradient id={`plBody_${uid}`} cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#6ab0d8" stopOpacity="1" />
          <stop offset="40%" stopColor="#2e7aaa" stopOpacity="1" />
          <stop offset="75%" stopColor="#163d60" stopOpacity="1" />
          <stop offset="100%" stopColor="#0a1e32" stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`plSpec_${uid}`} cx="32%" cy="27%" r="24%">
          <stop offset="0%" stopColor="#c8e8ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c8e8ff" stopOpacity="0" />
        </radialGradient>
        {/* Clip path to only draw the front half of the ring (bottom half) */}
        <clipPath id={`plFrontClip_${uid}`}>
          <rect x="0" y="65" width="130" height="65" />
        </clipPath>
      </defs>
      <g transform={`rotate(${rotation}, 65, 65)`}>
        {/* 1. Orbit ring BACK (behind planet body) */}
        <ellipse cx="65" cy="65" rx="55" ry="11" fill="none" stroke="#6888b8" strokeWidth="1" strokeDasharray="3 5" opacity="0.22" />
        
        {/* 2. Planet body */}
        <circle cx="65" cy="65" r="26" fill={`url(#plBody_${uid})`} />
        
        {/* Atmosphere bands */}
        <ellipse cx="65" cy="57" rx="25" ry="3" fill="none" stroke="#60a0c8" strokeWidth="0.8" opacity="0.18" />
        <ellipse cx="65" cy="65" rx="25" ry="2.5" fill="none" stroke="#4880a8" strokeWidth="0.6" opacity="0.12" />
        
        {/* Specular */}
        <circle cx="65" cy="65" r="26" fill={`url(#plSpec_${uid})`} />
        
        {/* 3. Orbit ring FRONT (drawn on top of planet body) */}
        <ellipse cx="65" cy="65" rx="55" ry="11" fill="none" stroke="#a0c8e8" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.45" clipPath={`url(#plFrontClip_${uid})`} />
      </g>
    </svg>
  );

  if (!animateFloat) return svgContent;

  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
    >
      {svgContent}
    </motion.div>
  );
}
