"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroLoaderProps {
  onComplete: () => void;
}

function SignalRing({ delay, radius, duration }: { delay: number; radius: number; duration: number }) {
  return (
    <motion.circle
      cx="0"
      cy="0"
      r={radius}
      fill="none"
      stroke="var(--ochre)"
      strokeWidth="1.5"
      initial={{ scale: 0.2, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 0 }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeOut", repeatDelay: 0.1 }}
    />
  );
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const duration = 2600;
    const interval = 30;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.round(eased * 100));
      if (t >= 1) {
        clearInterval(timer);
        setDone(true);
        setTimeout(() => onComplete(), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "var(--ink-deep)" }}
        >
          {/* ── Deep atmospheric backdrop ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 75% 60% at 50% 60%, rgba(172,201,181,0.07) 0%, transparent 70%)," +
                "radial-gradient(ellipse 55% 45% at 50% 20%, rgba(229,161,57,0.04) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* ── Subtle topo lines ── */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 1440 900" className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
              {[180, 310, 440, 570, 700].map((y, i) => (
                <path
                  key={i}
                  d={`M-100,${y} C300,${y - 45 + i * 9} 700,${y + 50 - i * 7} 1000,${y - 30 + i * 11} C1200,${y + 40 - i * 5} 1400,${y - 20 + i * 8} 1540,${y + 15}`}
                  stroke="var(--moss)"
                  strokeWidth="0.8"
                />
              ))}
            </svg>
          </div>

          {/* ── Top: organiser logos ── */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginBottom: "1.5rem" }}
          >
            <div className="flex items-center gap-5">
              <Image
                src="/logo/Comsoc Logo New Blue.png"
                alt="IEEE ComSoc Kerala Chapter"
                width={140}
                height={46}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.75, maxHeight: 40, width: "auto" }}
                priority
              />
              <span style={{ width: 1, height: 32, backgroundColor: "rgba(245,240,232,0.15)", display: "block" }} />
              <Image
                src="/logo/saint-logo .png"
                alt="Saintgits College of Engineering"
                width={52}
                height={52}
                className="object-contain"
                style={{ opacity: 0.65, maxHeight: 44, width: "auto" }}
              />
            </div>
            <span
              className="font-mono-editorial text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "rgba(245,240,232,0.28)" }}
            >
              Presents
            </span>
          </motion.div>

          {/* ── Central scene: tower + pulsing rings ── */}
          <div className="relative flex items-end justify-center animate-pulse-slow" style={{ width: 320, height: 300 }}>
            {/* Pulsing signal rings */}
            <svg
              className="absolute"
              style={{ left: "50%", top: "27%", transform: "translate(-50%,-50%)", overflow: "visible" }}
              width="0"
              height="0"
              viewBox="0 0 0 0"
              overflow="visible"
              aria-hidden="true"
            >
              <SignalRing radius={55} delay={0} duration={2} />
              <SignalRing radius={95} delay={0.45} duration={2} />
              <SignalRing radius={140} delay={0.9} duration={2} />
              <SignalRing radius={190} delay={1.35} duration={2} />
            </svg>

            {/* Tower SVG */}
            <motion.svg
              width="160"
              height="260"
              viewBox="0 0 100 160"
              fill="none"
              stroke="var(--star-glow)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
              style={{ position: "relative", zIndex: 10 }}
            >
              <line x1="12" y1="150" x2="88" y2="150" strokeWidth="2.5" />
              <polygon points="36,150 46,60 54,60 64,150" strokeWidth="2.2" fill="rgba(11,26,48,0.45)" />
              <line x1="39" y1="122" x2="61" y2="122" />
              <line x1="42" y1="98" x2="58" y2="98" />
              <line x1="44" y1="78" x2="56" y2="78" />
              <line x1="39" y1="122" x2="58" y2="98" strokeWidth="0.9" opacity="0.6" />
              <line x1="61" y1="122" x2="42" y2="98" strokeWidth="0.9" opacity="0.6" />
              <line x1="42" y1="98" x2="56" y2="78" strokeWidth="0.9" opacity="0.6" />
              <line x1="58" y1="98" x2="44" y2="78" strokeWidth="0.9" opacity="0.6" />
              <line x1="50" y1="60" x2="50" y2="38" strokeWidth="2.5" />
              <circle
                cx="50"
                cy="28"
                r="10"
                fill="var(--ochre)"
                stroke="var(--star-glow)"
                strokeWidth="1.2"
                style={{ filter: "drop-shadow(0 0 6px rgba(229,161,57,0.7))" }}
              />
            </motion.svg>
          </div>

          {/* ── PROCOMM '26 wordmark ── */}
          <motion.div
            className="flex flex-col items-center gap-1 z-10"
            style={{ marginTop: "1rem" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <span
              className="font-display font-bold italic"
              style={{
                fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
                lineHeight: 1,
                color: "var(--ivory)",
                letterSpacing: "-0.02em",
              }}
            >
              PROCOMM <span style={{ color: "var(--ochre)" }}>&apos;26</span>
            </span>
            <span
              className="font-mono-editorial tracking-[0.3em] uppercase"
              style={{ fontSize: "0.58rem", color: "rgba(245,240,232,0.38)" }}
            >
              IEEE Communications Project Competition
            </span>
          </motion.div>

          {/* ── Progress bar ── */}
          <motion.div
            className="z-10 w-full max-w-xs px-8 flex flex-col items-center gap-3"
            style={{ marginTop: "2rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "rgba(245,240,232,0.07)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, var(--moss), var(--ochre) 70%, var(--star-glow))",
                }}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="font-mono-editorial text-[9px] tracking-widest uppercase" style={{ color: "rgba(245,240,232,0.22)" }}>
                comsoc.ieeekerala.org
              </span>
              <span className="font-mono-editorial text-[10px] tabular-nums" style={{ color: "rgba(245,240,232,0.3)" }}>
                {progress}%
              </span>
            </div>
          </motion.div>

          {/* ── Footer line with logos ── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 border-t px-8 py-3 flex items-center justify-between"
            style={{ borderColor: "rgba(245,240,232,0.07)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="font-mono-editorial text-[9px] tracking-wider" style={{ color: "rgba(245,240,232,0.18)" }}>
              Sept 5th &amp; 6th, 2026
            </span>
            <Image
              src="/logo/ieee-saint.png"
              alt="Saintgits IEEE Student Branch"
              width={90}
              height={28}
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.3, maxHeight: 24, width: "auto" }}
            />
            <span className="font-mono-editorial text-[9px] tracking-wider" style={{ color: "rgba(245,240,232,0.18)" }}>
              Saintgits, Kottayam
            </span>
          </motion.div>

          {/* ── Skip button ── */}
          <AnimatePresence>
            {progress > 30 && (
              <motion.button
                key="skip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setDone(true)}
                className="absolute bottom-5 right-8 font-mono-editorial text-[9px] tracking-widest uppercase cursor-pointer"
                style={{ color: "rgba(245,240,232,0.2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.2)")}
              >
                Skip ↗
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
