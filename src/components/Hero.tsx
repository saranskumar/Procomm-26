"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Trophy } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const hillParallax = useTransform(scrollY, [0, 500], [0, 60]);
  const moonY = useTransform(scrollY, [0, 400], [0, -40]);
  const textY = useTransform(scrollY, [0, 300], [0, 30]);

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-end"
      style={{ backgroundColor: "var(--ink-deep)" }}
    >
      {/* ── Deep atmospheric gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 15% 85%, rgba(172,201,181,0.12) 0%, transparent 65%)," +
            "radial-gradient(ellipse 70% 50% at 85% 15%, rgba(229,161,57,0.04) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* ── Topographic contour lines (slow wander) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none line-wander opacity-[0.08]" aria-hidden="true">
        <svg viewBox="0 0 1440 900" className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
          {[120, 200, 280, 360, 440, 520].map((y, i) => (
            <path
              key={i}
              d={`M-100,${y} C200,${y - 40 + i * 8} 500,${y + 50 - i * 6} 800,${y - 30 + i * 10} C1100,${y + 40 - i * 5} 1300,${y - 20 + i * 8} 1540,${y + 15}`}
              stroke="var(--border)"
              strokeWidth="0.7"
              opacity={0.8 - i * 0.08}
            />
          ))}
        </svg>
      </div>

      {/* ── Floating crescent moon ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: "6%", right: "5%", y: moonY }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="opacity-50">
            <circle cx="80" cy="80" r="70" stroke="var(--star-glow)" strokeWidth="0.6" />
            <circle cx="80" cy="80" r="55" stroke="var(--star-glow)" strokeWidth="0.35" strokeDasharray="5 7" />
            <path d="M 80 18 A 62 62 0 1 1 80 142 A 40 40 0 1 0 80 18" fill="var(--star-glow)" opacity="0.14" />
            <circle cx="90" cy="68" r="4" stroke="var(--star-glow)" strokeWidth="0.4" fill="none" opacity="0.3" />
            <circle cx="70" cy="90" r="2.5" stroke="var(--star-glow)" strokeWidth="0.3" fill="none" opacity="0.22" />
            <ellipse cx="80" cy="80" rx="76" ry="17" stroke="var(--lavender)" strokeWidth="0.4" strokeDasharray="4 6" opacity="0.22" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Small floating planet (left, staggered phase) ── */}
      <div
        className="absolute pointer-events-none hidden md:block float-alt float-d3"
        style={{ top: "25%", left: "3%", opacity: 0.22 }}
        aria-hidden="true"
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="24" stroke="var(--lavender)" strokeWidth="0.8" fill="none" />
          <ellipse cx="28" cy="28" rx="38" ry="8" stroke="var(--lavender)" strokeWidth="0.5" strokeDasharray="3 5" fill="none" />
          <circle cx="28" cy="28" r="10" fill="var(--ink-mid)" stroke="var(--lavender)" strokeWidth="0.6" />
        </svg>
      </div>

      {/* ── Animated Signal Tower silhouette (right, standing on the hills) ── */}
      <motion.div 
        className="absolute bottom-[20px] right-[2%] sm:right-[4%] pointer-events-none z-10 select-none hidden sm:block"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.38, scale: 1.6 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{ transformOrigin: "bottom right" }}
      >
        <svg
          width="150"
          height="225"
          viewBox="0 0 100 150"
          fill="none"
          stroke="var(--star-glow)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Radiating Waves (pulsing communication waves) */}
          <motion.path 
            d="M 32,8 Q 20,25 32,42" 
            strokeWidth="2.2"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 20,-2 Q 0,25 20,52" 
            strokeWidth="2.2"
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
          />
          <motion.path 
            d="M 68,8 Q 80,25 68,42" 
            strokeWidth="2.2"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 80,-2 Q 100,25 80,52" 
            strokeWidth="2.2"
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
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
      </motion.div>

      {/* ── Layered rolling hills (background — slow parallax) ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ y: hillParallax }}
        aria-hidden="true"
      >
        {/* Layer 3 — deepest, darkest */}
        <svg viewBox="0 0 1440 280" preserveAspectRatio="none" className="w-full block">
          <path
            d="M0,200 C160,140 320,190 480,160 C640,130 800,185 960,155 C1120,125 1280,175 1440,155 L1440,280 L0,280 Z"
            fill="rgba(40,52,52,0.7)"
          />
        </svg>
      </motion.div>

      {/* ── Layered rolling hills (foreground wave — animated) ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        {/* Hill layer 2 — frost tint */}
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full block absolute bottom-0">
          <motion.path
            d="M0,130 C200,80 400,150 600,110 C800,70 1000,140 1200,100 C1340,72 1400,115 1440,108 L1440,200 L0,200 Z"
            fill="rgba(195,217,202,0.16)"
            animate={{
              d: [
                "M0,130 C200,80 400,150 600,110 C800,70 1000,140 1200,100 C1340,72 1400,115 1440,108 L1440,200 L0,200 Z",
                "M0,120 C200,95 400,135 600,120 C800,85 1000,128 1200,112 C1340,88 1400,105 1440,118 L1440,200 L0,200 Z",
                "M0,130 C200,80 400,150 600,110 C800,70 1000,140 1200,100 C1340,72 1400,115 1440,108 L1440,200 L0,200 Z",
              ],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Hill layer 1 — transition to ivory */}
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block absolute bottom-0" style={{ marginBottom: "-1px" }}>
          <motion.path
            d="M0,75 C240,35 480,90 720,62 C960,34 1200,80 1440,58 L1440,120 L0,120 Z"
            fill="var(--ivory)"
            animate={{
              d: [
                "M0,75 C240,35 480,90 720,62 C960,34 1200,80 1440,58 L1440,120 L0,120 Z",
                "M0,65 C240,48 480,78 720,70 C960,48 1200,70 1440,68 L1440,120 L0,120 Z",
                "M0,75 C240,35 480,90 720,62 C960,34 1200,80 1440,58 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          {/* Second subtle hill layer */}
          <motion.path
            d="M0,95 C180,72 360,100 540,88 C720,76 900,98 1080,86 C1260,74 1380,92 1440,90 L1440,120 L0,120 Z"
            fill="rgba(250,247,230,0.5)"
            animate={{
              d: [
                "M0,95 C180,72 360,100 540,88 C720,76 900,98 1080,86 C1260,74 1380,92 1440,90 L1440,120 L0,120 Z",
                "M0,88 C180,80 360,92 540,96 C720,84 900,90 1080,94 C1260,82 1380,88 1440,96 L1440,120 L0,120 Z",
                "M0,95 C180,72 360,100 540,88 C720,76 900,98 1080,86 C1260,74 1380,92 1440,90 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          />
        </svg>
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-36 pt-36"
        style={{ y: textY }}
      >
        {/* Presenter stamp */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
        >
          <span className="vintage-stamp-light">
            <svg width="5" height="5" viewBox="0 0 5 5" aria-hidden="true"><circle cx="2.5" cy="2.5" r="2.5" fill="var(--ochre)" /></svg>
            IEEE ComSoc Kerala Chapter Presents
          </span>
        </motion.div>

        {/* ── Giant headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="hero-display-text select-text"
          style={{ fontSize: "clamp(3.2rem, 10vw, 9rem)", lineHeight: 0.95, textShadow: "none" }}
        >
          PROCOMM <span style={{ color: "var(--ochre)" }}>&apos;26</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="font-mono-editorial tracking-[0.22em] uppercase mt-6"
          style={{ fontSize: "0.65rem", color: "rgba(250,247,230,0.4)", letterSpacing: "0.28em" }}
        >
          Flagship 24-Hour Communications Project Competition
        </motion.p>

        {/* ── CTA Actions ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-10 flex flex-wrap gap-3 items-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/register" className="btn-ochre" id="hero-register-btn">
              Register Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/competition" className="btn-secondary" id="hero-competition-btn">
              Competition Rules
            </Link>
          </motion.div>
        </motion.div>

        {/* Venue strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 flex flex-wrap gap-6 items-center"
        >
          {[
            { icon: Calendar, text: "Sept 5th & 6th, 2026" },
            { icon: MapPin, text: "Saintgits College of Engineering (Autonomous), Kottayam, Kerala" },
            { icon: Trophy, text: "₹28,000+ Prize Pool" },
          ].map((item, i) => (
            <span key={i} className="font-mono-editorial flex items-center gap-2" style={{ fontSize: "0.65rem", color: "rgba(250,247,230,0.3)" }}>
              <item.icon className="w-3.5 h-3.5" style={{ color: "var(--ochre)", opacity: 0.7 }} />
              {item.text}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
