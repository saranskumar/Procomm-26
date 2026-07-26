"use client";

import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  className?: string;
}

export function Meteors({
  number = 6,
  minDelay = 2,
  maxDelay = 14,
  minDuration = 3.5,
  maxDuration = 8,
  className,
}: MeteorsProps) {
  const [meteorStyles, setMeteorStyles] = useState<Array<{
    top: number;
    left: string;
    animationDelay: string;
    animationDuration: string;
    isGold: boolean;
  }>>([]);

  useEffect(() => {
    // Generate randomized meteor positions across upper sky region
    const styles = Array.from({ length: number }).map(() => ({
      top: Math.floor(Math.random() * 320) - 60, // -60px to 260px above/in sky
      left: Math.floor(Math.random() * 125) - 10 + "%",
      animationDelay: (Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2) + "s",
      animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s",
      isGold: Math.random() > 0.45,
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ""}`}
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
      }}
    >
      {meteorStyles.map((style, idx) => (
        /* Meteor Head */
        <span
          key={idx}
          style={{
            top: style.top + "px",
            left: style.left,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
          className={`animate-meteor absolute h-1 w-1 rounded-full bg-white opacity-0 select-none
            ${style.isGold ? "shadow-[0_0_12px_2px_rgba(255,210,112,0.9)]" : "shadow-[0_0_12px_2px_rgba(160,200,255,0.9)]"}`}
        >
          {/* Meteor Tail — trailing 85px behind head */}
          <div
            className={`pointer-events-none absolute top-1/2 -z-10 h-[1.2px] w-[85px] -translate-y-1/2 bg-gradient-to-r
              ${style.isGold ? "from-[#ffd270] via-[#ffd270]/40 to-transparent" : "from-[#a0c8ff] via-[#a0c8ff]/40 to-transparent"}`}
          />
        </span>
      ))}
    </div>
  );
}
