"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2200; // 2.2 seconds total load
    const intervalTime = 40;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Wait a short moment at 100% before completing
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: "-100%",
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-retro-cream p-6 text-center select-none retro-grid-bg"
    >
      {/* Logos and Top Text Area */}
      <div className="w-full max-w-4xl flex flex-col items-center mt-12">
        <div className="flex gap-8 mb-8 text-[11px] font-bold tracking-widest text-retro-brown opacity-80 uppercase">
          <span>IEEE ComSoc Kerala Chapter</span>
          <span>•</span>
          <span>IEEE Kerala Section</span>
          <span>•</span>
          <span>IEEE</span>
        </div>
        
        <p className="font-syne text-xs md:text-sm font-bold tracking-[0.25em] text-retro-brown uppercase mt-8">
          IEEE COMSOC KERALA CHAPTER
        </p>
        <p className="font-syne text-[10px] md:text-xs tracking-[0.3em] text-retro-brown/80 uppercase mt-1">
          Presents
        </p>
      </div>

      {/* Center Logo Area */}
      <div className="flex flex-col items-center justify-center my-auto">
        <h1 className="retro-text-3d text-5xl sm:text-7xl md:text-8xl select-none leading-none">
          PROCOMM&apos;26
        </h1>
        <p className="font-syne text-[10px] sm:text-xs md:text-sm tracking-[0.35em] text-retro-brown uppercase mt-4 font-bold">
          IEEE Communications Project Competition
        </p>
      </div>

      {/* Bottom Loading Area */}
      <div className="w-full max-w-md flex flex-col items-center mb-16 px-4">
        <div className="font-mono text-xs tracking-widest text-retro-brown mb-3">
          loading... {Math.round(progress)}%
        </div>
        
        {/* Retro Loading Bar Container */}
        <div className="w-full h-8 bg-retro-white border-[2.5px] border-retro-brown rounded-full p-[3px] overflow-hidden shadow-[2px_2px_0px_#5d3a1a]">
          <motion.div 
            className="h-full bg-retro-brown rounded-full"
            style={{ width: `${progress}%` }}
            layoutId="loading-bar-fill"
          />
        </div>

        {/* Skip button for repeated visits */}
        <button
          onClick={onComplete}
          className="mt-8 font-syne text-[10px] tracking-widest text-retro-brown/60 hover:text-retro-brown underline uppercase cursor-pointer transition-colors"
        >
          Skip Intro
        </button>
      </div>

      {/* Footer Text */}
      <div className="w-full max-w-4xl border-t border-retro-brown/20 pt-4 mb-4 text-[10px] tracking-wider text-retro-brown/70 font-mono">
        comsoc.ieeekerala.org | f @ X in /ieeecomsocks
      </div>
    </motion.div>
  );
}
