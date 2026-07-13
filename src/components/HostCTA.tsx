"use client";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function HostCTA() {
  const triggerConfetti = () => {
    // Fire a nice celebratory confetti shower
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#5d3a1a", "#e3d5c1", "#ffffff"]
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#5d3a1a", "#e3d5c1", "#ffffff"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Open target link
    window.open("https://tinyurl.com/call-for-host-procomm", "_blank");
  };

  return (
    <section id="host" className="w-full bg-retro-cream py-16 px-6 border-b-[3px] border-retro-brown flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl text-center flex flex-col items-center">
        
        {/* Shaded 3D Heading */}
        <h2 className="retro-text-3d-secondary text-4xl sm:text-5xl md:text-6xl mb-10 select-none">
          CALL FOR HOST
        </h2>

        {/* Double-bordered container matching the poster */}
        <div className="w-full bg-retro-cream border-[3.5px] border-retro-brown rounded-[24px] p-5 sm:p-7 md:p-9 shadow-[6px_6px_0px_rgba(93,58,26,0.15)] outline-none relative">
          
          {/* Decorative Corner Dots */}
          <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-retro-brown" />
          <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-retro-brown" />
          <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-retro-brown" />
          <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-retro-brown" />

          <div className="flex flex-col gap-4">
            
            {/* ROW 1: Apply Now */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              {/* Button */}
              <button
                onClick={triggerConfetti}
                className="flex-1 sm:flex-[2] bg-retro-brown hover:bg-retro-brown/95 text-retro-white font-syne text-xs md:text-sm font-extrabold tracking-widest py-3.5 px-6 rounded-xl uppercase transition-transform active:scale-[0.98] shadow-sm flex items-center justify-center cursor-pointer border border-transparent"
              >
                APPLY NOW
              </button>
              
              {/* URL Display Box */}
              <div className="flex-1 sm:flex-[5] border-2 border-retro-brown rounded-xl py-3 px-4 flex items-center justify-center bg-retro-white font-mono text-[10px] sm:text-xs md:text-[13px] font-bold text-retro-brown select-all overflow-hidden truncate">
                tinyurl.com/call-for-host-procomm
              </div>
            </div>

            {/* ROW 2: Deadline */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              {/* Button Label */}
              <div className="flex-1 sm:flex-[2] bg-retro-brown text-retro-white font-syne text-xs md:text-sm font-extrabold tracking-widest py-3.5 px-6 rounded-xl uppercase flex items-center justify-center">
                DEADLINE
              </div>
              
              {/* Date Box */}
              <div className="flex-1 sm:flex-[5] border-2 border-retro-brown rounded-xl py-3 px-4 flex items-center justify-center bg-retro-white font-syne text-xs sm:text-sm md:text-base font-extrabold text-retro-brown">
                2<sup className="text-[10px] md:text-xs mr-1">nd</sup> July 2026
              </div>
            </div>

          </div>
        </div>

        {/* Action guidelines */}
        <div className="mt-10 max-w-xl text-center">
          <p className="font-outfit text-sm text-retro-brown/80 leading-relaxed">
            Campuses across Kerala Section are invited to submit their expression of interest to host PROCOMM &apos;26. Show host suitability, student engagement capability, and state-of-the-art facilities.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-retro-brown border-b border-retro-brown pb-0.5">
            <span>Read full hosting terms & conditions</span>
            <span>&rarr;</span>
          </div>
        </div>

      </div>
    </section>
  );
}
