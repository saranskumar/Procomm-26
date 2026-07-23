"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set final registration deadline to October 15, 2026
    const targetDate = new Date("2026-10-15T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-retro-cream py-16 md:py-24 px-6 border-b-[3px] border-retro-brown retro-grid-bg select-none">
      
      {/* Background Campus Building SVG Sketch */}
      <div className="absolute right-0 bottom-0 top-0 w-full md:w-3/5 pointer-events-none opacity-20 md:opacity-30 flex items-end justify-end">
        <svg 
          className="w-full h-full max-h-[550px] object-contain text-retro-brown" 
          viewBox="0 0 800 600" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.2"
        >
          <line x1="50" y1="580" x2="750" y2="580" strokeDasharray="4 4" />
          <line x1="100" y1="50" x2="100" y2="580" strokeDasharray="4 4" />
          <line x1="700" y1="50" x2="700" y2="580" strokeDasharray="4 4" />
          <rect x="250" y="200" width="450" height="380" />
          <rect x="150" y="300" width="100" height="280" />
          <path d="M 150 300 L 200 250 L 250 300 Z" />
          <line x1="310" y1="200" x2="310" y2="580" />
          <line x1="370" y1="200" x2="370" y2="580" />
          <line x1="430" y1="200" x2="430" y2="580" />
          <line x1="490" y1="200" x2="490" y2="580" />
          <line x1="550" y1="200" x2="550" y2="580" />
          <line x1="610" y1="200" x2="610" y2="580" />
          <line x1="670" y1="200" x2="670" y2="580" />
          <line x1="250" y1="280" x2="700" y2="280" />
          <line x1="250" y1="360" x2="700" y2="360" />
          <line x1="250" y1="440" x2="700" y2="440" />
          <line x1="250" y1="520" x2="700" y2="520" />
          <rect x="270" y="220" width="20" height="40" />
          <rect x="330" y="220" width="20" height="40" />
          <rect x="390" y="220" width="20" height="40" />
          <rect x="450" y="220" width="20" height="40" />
          <rect x="510" y="220" width="20" height="40" />
          <rect x="570" y="220" width="20" height="40" />
          <rect x="630" y="220" width="20" height="40" />
          <rect x="270" y="300" width="20" height="40" />
          <rect x="330" y="300" width="20" height="40" />
          <rect x="390" y="300" width="20" height="40" />
          <rect x="450" y="300" width="20" height="40" />
          <rect x="510" y="300" width="20" height="40" />
          <rect x="570" y="300" width="20" height="40" />
          <rect x="630" y="300" width="20" height="40" />
          <rect x="270" y="380" width="20" height="40" />
          <rect x="330" y="380" width="20" height="40" />
          <rect x="390" y="380" width="20" height="40" />
          <rect x="450" y="380" width="20" height="40" />
          <rect x="510" y="380" width="20" height="40" />
          <rect x="570" y="380" width="20" height="40" />
          <rect x="630" y="380" width="20" height="40" />
          <rect x="270" y="460" width="20" height="40" />
          <rect x="330" y="460" width="20" height="40" />
          <rect x="390" y="460" width="20" height="40" />
          <rect x="450" y="460" width="20" height="40" />
          <rect x="510" y="460" width="20" height="40" />
          <rect x="570" y="460" width="20" height="40" />
          <rect x="630" y="460" width="20" height="40" />
          <rect x="170" y="320" width="20" height="40" />
          <rect x="210" y="320" width="20" height="40" />
          <rect x="170" y="380" width="20" height="40" />
          <rect x="210" y="380" width="20" height="40" />
          <rect x="170" y="440" width="20" height="40" />
          <rect x="210" y="440" width="20" height="40" />
          <polygon points="410,580 410,500 530,500 530,580" fill="none" />
          <polygon points="390,500 470,450 550,500" fill="none" />
          <line x1="470" y1="450" x2="470" y2="500" />
          <line x1="390" y1="580" x2="550" y2="580" />
          <line x1="400" y1="570" x2="540" y2="570" />
          <line x1="410" y1="560" x2="530" y2="560" />
          <path d="M 80 580 Q 75 510 80 440 Q 50 420 70 380 Q 110 390 100 440 Q 120 490 85 580" fill="none" />
          <path d="M 80 440 Q 90 410 80 395 Q 60 405 80 440" fill="none" />
          <path d="M 730 580 Q 740 500 730 420 Q 700 400 725 350 Q 770 370 755 430 Q 775 490 735 580" fill="none" />
          <line x1="250" y1="200" x2="475" y2="100" />
          <line x1="700" y1="200" x2="475" y2="100" />
          <line x1="290" y1="180" x2="290" y2="200" />
          <line x1="340" y1="160" x2="340" y2="200" />
          <line x1="390" y1="140" x2="390" y2="200" />
          <line x1="440" y1="120" x2="440" y2="200" />
          <line x1="510" y1="120" x2="510" y2="200" />
          <line x1="560" y1="140" x2="560" y2="200" />
          <line x1="610" y1="160" x2="610" y2="200" />
          <line x1="660" y1="180" x2="660" y2="200" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto z-10 flex flex-col items-start justify-center min-h-[500px]">
        
        {/* Presenter Text */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <span className="bg-retro-brown text-retro-cream px-3 py-1 text-xs font-extrabold tracking-widest uppercase rounded">
            IEEE COMSOC KERALA CHAPTER PRESENTS
          </span>
        </motion.div>

        {/* Shaded 3D Heading */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="retro-text-3d text-6xl sm:text-8xl md:text-[100px] leading-tight text-left select-text"
        >
          PROCOMM&apos;26
        </motion.h1>

        {/* Expanded Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-syne text-xs sm:text-sm md:text-lg font-bold tracking-[0.25em] text-retro-brown uppercase mt-4 max-w-2xl"
        >
          IEEE COMMUNICATIONS PROJECT COMPETITION
        </motion.p>

        {/* Event Theme Box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 border-2 border-retro-brown bg-retro-white rounded-xl p-4 max-w-xl shadow-[3px_3px_0px_#5d3a1a]"
        >
          <div className="font-mono text-[9px] font-bold text-retro-brown/60 uppercase tracking-widest">[ Event Theme ]</div>
          <p className="font-outfit text-xs sm:text-sm font-semibold text-retro-brown mt-1">
            Next-Gen Telecommunications: Engineering Scalable Wireless Protocols, IoT Systems, & Secure Network Architectures.
          </p>
        </motion.div>

        {/* Dynamic Countdown Timer */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 flex gap-4 select-text"
        >
          {[
            { label: "Days", val: timeLeft.days },
            { label: "Hours", val: timeLeft.hours },
            { label: "Mins", val: timeLeft.minutes },
            { label: "Secs", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-retro-white border-2 border-retro-brown rounded-xl flex items-center justify-center font-syne text-lg sm:text-xl font-black text-retro-brown shadow-[2px_2px_0px_#5d3a1a]">
                {String(item.val).padStart(2, "0")}
              </div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-retro-brown/70 mt-1">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link 
            href="/register" 
            className="px-6 py-3 bg-retro-brown hover:bg-retro-brown/95 text-retro-white font-syne text-xs sm:text-sm font-extrabold tracking-widest rounded uppercase shadow-[4px_4px_0px_#e3d5c1] hover:shadow-[2px_2px_0px_#e3d5c1] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
          >
            Register Now
          </Link>
          <Link 
            href="/competition" 
            className="px-6 py-3 border-[2.5px] border-retro-brown bg-retro-white text-retro-brown font-syne text-xs sm:text-sm font-extrabold tracking-widest rounded uppercase hover:bg-retro-cream transition-colors cursor-pointer"
          >
            Competition Rules
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
