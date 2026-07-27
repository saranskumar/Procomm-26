"use client";

import { motion } from "framer-motion";

interface SignalTowerProps {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export default function SignalTower({
  width = 150,
  height = 225,
  className = "",
  onClick,
  title,
}: SignalTowerProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 150"
      fill="none"
      stroke="var(--star-glow)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`select-none ${className}`}
      onClick={onClick}
      aria-hidden="true"
    >
      {title && <title>{title}</title>}
      {/* Animated Concentric Radio Waves */}
      <motion.path
        d="M 32,8 Q 20,25 32,42"
        strokeWidth="2.2"
        animate={{ opacity: [0.2, 0.9, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 20,-2 Q 0,25 20,52"
        strokeWidth="2.2"
        animate={{ opacity: [0.1, 0.7, 0.1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.path
        d="M 68,8 Q 80,25 68,42"
        strokeWidth="2.2"
        animate={{ opacity: [0.2, 0.9, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 80,-2 Q 100,25 80,52"
        strokeWidth="2.2"
        animate={{ opacity: [0.1, 0.7, 0.1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* Tower Ground Base */}
      <line x1="15" y1="140" x2="85" y2="140" strokeWidth="2.5" />
      
      {/* Main A-frame Mast */}
      <polygon points="35,140 45,55 55,55 65,140" strokeWidth="2" fill="rgba(11, 26, 48, 0.3)" />
      
      {/* Horizontal cross struts */}
      <line x1="38" y1="115" x2="62" y2="115" />
      <line x1="41" y1="90" x2="59" y2="90" />
      <line x1="43.5" y1="70" x2="56.5" y2="70" />

      {/* Inner diagonal support bracing */}
      <line x1="38" y1="115" x2="59" y2="90" strokeWidth="0.8" opacity="0.65" />
      <line x1="62" y1="115" x2="41" y2="90" strokeWidth="0.8" opacity="0.65" />
      <line x1="41" y1="90" x2="56.5" y2="70" strokeWidth="0.8" opacity="0.65" />
      <line x1="59" y1="90" x2="43.5" y2="70" strokeWidth="0.8" opacity="0.65" />

      {/* Stem & Transmitter Node */}
      <line x1="50" y1="55" x2="50" y2="35" strokeWidth="2.5" />
      <circle cx="50" cy="25" r="9" fill="var(--star-glow)" stroke="var(--star-glow)" strokeWidth="1" />
    </svg>
  );
}
