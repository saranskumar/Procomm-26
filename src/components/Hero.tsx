"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { Meteors } from "@/registry/magicui/meteors";

export default function Hero() {
  const { scrollY } = useScroll();
  const skyRef = useRef<HTMLDivElement>(null);
  const hillParallax = useTransform(scrollY, [0, 500], [0, 60]);
  const moonY = useTransform(scrollY, [0, 400], [0, -40]);
  const textY = useTransform(scrollY, [0, 300], [0, 30]);

  // Motion values for interactive draggable cosmic elements
  const satelliteX = useMotionValue(0);
  const satelliteY = useMotionValue(0);
  const leftPlanetX = useMotionValue(0);
  const leftPlanetY = useMotionValue(0);
  const rightPlanetX = useMotionValue(0);
  const rightPlanetY = useMotionValue(0);

  // Imperative spring animations to return the elements to their origin on tower click
  const resetElements = () => {
    const springConfig = { type: "spring" as const, stiffness: 28, damping: 18, mass: 1.4 };
    animate(satelliteX, 0, springConfig);
    animate(satelliteY, 0, springConfig);
    animate(leftPlanetX, 0, springConfig);
    animate(leftPlanetY, 0, springConfig);
    animate(rightPlanetX, 0, springConfig);
    animate(rightPlanetY, 0, springConfig);
  };

  // ── Gyroscope / accelerometer parallax for mobile ──
  useEffect(() => {
    // Only activate on touch devices
    if (!("ontouchstart" in window)) return;

    // Sensitivity multipliers per element (minimal ambient drift)
    const SATELLITE_SENSITIVITY = { x: 0.8, y: 0.6 };
    const LEFT_PLANET_SENSITIVITY = { x: 0.5, y: 0.4 };
    const RIGHT_PLANET_SENSITIVITY = { x: 0.8, y: 0.7 };

    // Smoothing factor — very heavy lag for floaty feel
    const SMOOTH = 0.03;

    // Calibration baseline (captured on first orientation event)
    let baseGamma: number | null = null;
    let baseBeta: number | null = null;

    // Current target values (updated by gyro, smoothed toward by rAF)
    let targetSatX = 0, targetSatY = 0;
    let targetLPX = 0, targetLPY = 0;
    let targetRPX = 0, targetRPY = 0;
    let rafId: number;

    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right tilt, -90 to 90
      const beta  = e.beta  ?? 0; // front/back tilt, -180 to 180

      // Calibrate on first event
      if (baseGamma === null) baseGamma = gamma;
      if (baseBeta  === null) baseBeta  = beta;

      const dx = gamma - baseGamma; // relative left-right tilt
      const dy = beta  - baseBeta;  // relative forward-back tilt

      // Clamp to ±30 degrees so extreme tilts don't push elements off screen
      const clampedDx = Math.max(-30, Math.min(30, dx));
      const clampedDy = Math.max(-30, Math.min(30, dy));

      targetSatX = clampedDx * SATELLITE_SENSITIVITY.x;
      targetSatY = clampedDy * SATELLITE_SENSITIVITY.y;
      targetLPX  = clampedDx * LEFT_PLANET_SENSITIVITY.x;
      targetLPY  = clampedDy * LEFT_PLANET_SENSITIVITY.y;
      targetRPX  = clampedDx * RIGHT_PLANET_SENSITIVITY.x;
      targetRPY  = clampedDy * RIGHT_PLANET_SENSITIVITY.y;
    };

    // Smooth interpolation loop
    const tick = () => {
      satelliteX.set(satelliteX.get() + (targetSatX - satelliteX.get()) * SMOOTH);
      satelliteY.set(satelliteY.get() + (targetSatY - satelliteY.get()) * SMOOTH);
      leftPlanetX.set(leftPlanetX.get() + (targetLPX - leftPlanetX.get()) * SMOOTH);
      leftPlanetY.set(leftPlanetY.get() + (targetLPY - leftPlanetY.get()) * SMOOTH);
      rightPlanetX.set(rightPlanetX.get() + (targetRPX - rightPlanetX.get()) * SMOOTH);
      rightPlanetY.set(rightPlanetY.get() + (targetRPY - rightPlanetY.get()) * SMOOTH);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const startListening = () => {
      window.addEventListener("deviceorientation", onOrientation, true);
    };

    // iOS 13+ requires explicit permission
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function"
    ) {
      // On iOS we can't auto-request — attach to a user gesture instead
      const requestOnTouch = () => {
        (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
          .requestPermission()
          .then((state: string) => {
            if (state === "granted") startListening();
          })
          .catch(() => {/* silently ignore */});
        document.removeEventListener("touchstart", requestOnTouch);
      };
      document.addEventListener("touchstart", requestOnTouch, { once: true });
    } else {
      // Android / non-gated browsers — start immediately
      startListening();
    }

    return () => {
      window.removeEventListener("deviceorientation", onOrientation, true);
      cancelAnimationFrame(rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-end"
      style={{
        /* Blended night sky mixing original dark pine green (#283434) with deep teal-navy */
        background:
          "linear-gradient(180deg, #122020 0%, #172b31 30%, #1d3a43 55%, #162d34 80%, #0f1d20 100%)",
      }}
    >
      {/* Invisible boundary container for drag constraints (restricting components to the sky area) */}
      <div ref={skyRef} className="absolute inset-0 bottom-[130px] pointer-events-none" />
      {/* ── Blended ambient atmospheric glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 50% 60%, rgba(29,74,86,0.5) 0%, transparent 70%)," +
            "radial-gradient(ellipse 60% 30% at 15% 85%, rgba(20,44,48,0.3) 0%, transparent 60%)," +
            "radial-gradient(circle 500px at 50% 30%, rgba(229,161,57,0.06) 0%, transparent 75%)," + // Center solar glow
            "radial-gradient(circle 400px at 50% 35%, rgba(164,219,233,0.08) 0%, transparent 70%)", // Center ice-blue glow
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

      {/* ── Star field (twinkling dots) + Dynamic Meteors ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Twinkling background stars */}
        <svg viewBox="0 0 1440 900" className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
          {([
            [120,38,1.1,0.8],[280,72,0.7,0.5],[440,18,0.9,0.7],[560,55,0.5,0.4],
            [680,30,1.3,0.9],[820,48,0.6,0.45],[920,22,0.8,0.6],[1050,60,1.0,0.75],
            [1180,35,0.7,0.5],[1320,18,1.1,0.8],[1400,55,0.5,0.4],[200,100,0.6,0.4],
            [380,88,1.2,0.85],[500,115,0.5,0.35],[640,92,0.8,0.6],[760,78,1.0,0.7],
            [900,105,0.6,0.45],[1010,82,1.3,0.9],[1140,98,0.7,0.5],[1260,72,0.9,0.65],
            [70,140,0.7,0.5],[310,155,1.0,0.7],[470,135,0.6,0.4],[630,165,1.1,0.8],
            [780,145,0.5,0.35],[940,160,0.8,0.55],[1090,138,1.2,0.85],[1240,155,0.6,0.4],
            [1380,142,0.9,0.7],[160,195,0.5,0.35],[340,210,1.0,0.72],[600,200,0.7,0.5],
            [850,215,0.6,0.42],[1100,198,1.1,0.78],[1300,208,0.5,0.38],
            [50,260,0.8,0.55],[420,255,0.6,0.4],[710,268,1.0,0.7],[990,250,0.7,0.5],
            [1200,265,0.9,0.65],[1420,258,0.5,0.38],
            [170,310,0.6,0.42],[500,320,0.8,0.58],[780,308,1.1,0.8],[1060,315,0.6,0.44],
            [1350,305,0.9,0.65],
          ] as [number,number,number,number][]).map(([cx,cy,r,o],i) => (
            <motion.circle
              key={i} cx={cx} cy={cy} r={r} fill="#e8d8a0"
              animate={{ opacity: [o*0.4, o, o*0.5, o*0.9, o*0.3, o] }}
              transition={{
                duration: 3 + (i % 5) * 0.8,
                delay: (i * 0.37) % 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

        </svg>

        {/* Dynamic meteor shower layer, restricted to the upper sky height */}
        <div className="absolute inset-0 max-h-[420px]">
          <Meteors number={6} minDelay={2} maxDelay={14} minDuration={3.5} maxDuration={8} className="opacity-90" />
        </div>
      </div>

      {/* ── Planet LEFT — teal-blue ringed (small), upper-left (Draggable) ── */}
      <motion.div
        drag
        dragConstraints={skyRef}
        dragElastic={0.2}
        dragTransition={{ power: 0.10, timeConstant: 200 }}
        whileDrag={{ scale: 1.06, cursor: "grabbing" }}
        className="absolute hidden md:block z-30 select-none pointer-events-auto cursor-grab"
        style={{ top: "8%", left: "38%", x: leftPlanetX, y: leftPlanetY }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
            <defs>
              {/* Teal-blue gradient matching reference (fully opaque stop points) */}
              <radialGradient id="plBody" cx="35%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#6ab0d8" stopOpacity="1" />
                <stop offset="40%" stopColor="#2e7aaa" stopOpacity="1" />
                <stop offset="75%" stopColor="#163d60" stopOpacity="1" />
                <stop offset="100%" stopColor="#0a1e32" stopOpacity="1" />
              </radialGradient>
              <radialGradient id="plSpec" cx="32%" cy="27%" r="24%">
                <stop offset="0%" stopColor="#c8e8ff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#c8e8ff" stopOpacity="0" />
              </radialGradient>
              {/* Clip path to only draw the front half of the ring (bottom half) */}
              <clipPath id="plFrontClip">
                <rect x="0" y="65" width="130" height="65" />
              </clipPath>
            </defs>
            <g transform="rotate(-15, 65, 65)">
              {/* 1. Orbit ring BACK (behind the planet body) */}
              <ellipse cx="65" cy="65" rx="55" ry="11" fill="none" stroke="#6888b8" strokeWidth="1" strokeDasharray="3 5" opacity="0.22" />
              
              {/* 2. Planet body (100% opaque to block stars passing behind it) */}
              <circle cx="65" cy="65" r="26" fill="url(#plBody)" />
              
              {/* Atmosphere bands */}
              <ellipse cx="65" cy="57" rx="25" ry="3" fill="none" stroke="#60a0c8" strokeWidth="0.8" opacity="0.18" />
              <ellipse cx="65" cy="65" rx="25" ry="2.5" fill="none" stroke="#4880a8" strokeWidth="0.6" opacity="0.12" />
              
              {/* Specular */}
              <circle cx="65" cy="65" r="26" fill="url(#plSpec)" />
              
              {/* 3. Orbit ring FRONT (drawn on top of the planet body) */}
              <ellipse cx="65" cy="65" rx="55" ry="11" fill="none" stroke="#a0c8e8" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.45" clipPath="url(#plFrontClip)" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Planet RIGHT — large dark-navy solid, upper-right (Draggable) ── */}
      <motion.div
        drag
        dragConstraints={skyRef}
        dragElastic={0.2}
        dragTransition={{ power: 0.12, timeConstant: 200 }}
        whileDrag={{ scale: 1.06, cursor: "grabbing" }}
        className="absolute z-30 select-none pointer-events-auto cursor-grab"
        style={{ top: "-1%", right: "-1%", x: rightPlanetX, y: rightPlanetY }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
            <defs>
              {/* Deep navy matching reference — fully opaque stop points */}
              <radialGradient id="prBody" cx="34%" cy="30%" r="58%">
                <stop offset="0%" stopColor="#4a70a8" stopOpacity="1" />
                <stop offset="30%" stopColor="#1e3d6a" stopOpacity="1" />
                <stop offset="65%" stopColor="#0d2040" stopOpacity="1" />
                <stop offset="100%" stopColor="#060e20" stopOpacity="1" />
              </radialGradient>
              <radialGradient id="prSpec" cx="30%" cy="25%" r="20%">
                <stop offset="0%" stopColor="#a0c0e8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a0c0e8" stopOpacity="0" />
              </radialGradient>
              {/* Clip path to only draw the front half of the ring (bottom half) */}
              <clipPath id="prFrontClip">
                <rect x="0" y="120" width="240" height="120" />
              </clipPath>
            </defs>
            <g transform="rotate(-12, 120, 120)">
              {/* Subtle glow behind planet */}
              <circle cx="120" cy="120" r="85" fill="#1e3d6a" opacity="0.04" />
              
              {/* 1. Orbit ring BACK (behind the planet body) */}
              <ellipse cx="120" cy="120" rx="108" ry="15" fill="none" stroke="#6888b8" strokeWidth="1" strokeDasharray="8 5" opacity="0.22" />
              
              {/* 2. Planet body (100% opaque to block stars passing behind it) */}
              <circle cx="120" cy="120" r="62" fill="url(#prBody)" />
              
              {/* Specular */}
              <circle cx="120" cy="120" r="62" fill="url(#prSpec)" />
              
              {/* 3. Orbit ring FRONT (drawn on top of the planet body) */}
              <ellipse cx="120" cy="120" rx="108" ry="15" fill="none" stroke="#7898c8" strokeWidth="1.2" strokeDasharray="8 5" opacity="0.4" clipPath="url(#prFrontClip)" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Floating Satellite (Draggable) ── */}
      <motion.div
        drag
        dragConstraints={skyRef}
        dragElastic={0.2}
        dragTransition={{ power: 0.12, timeConstant: 200 }}
        whileDrag={{ scale: 1.06, cursor: "grabbing" }}
        className="absolute z-30 select-none pointer-events-auto cursor-grab"
        style={{ top: "10%", left: "2%", x: satelliteX, y: satelliteY }}
      >
        <motion.div
          style={{ y: useTransform(scrollY, [0, 400], [0, -25]) }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="scale-60 sm:scale-85 lg:scale-100 origin-top-left"
          >
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="opacity-45 sm:opacity-35">
              {/* Orbit path line */}
              <path d="M-20,110 Q80,20 180,80" stroke="var(--lavender)" strokeWidth="0.4" strokeDasharray="3 6" opacity="0.25" />
              
              {/* Satellite body group */}
              <g transform="translate(80, 70) rotate(-22)">
                {/* Solar Panels (Left) */}
                <rect x="-65" y="-8" width="40" height="16" rx="1.5" fill="none" stroke="var(--star-glow)" strokeWidth="0.8" opacity="0.4" />
                <line x1="-65" y1="0" x2="-25" y2="0" stroke="var(--star-glow)" strokeWidth="0.6" opacity="0.4" />
                <line x1="-55" y1="-8" x2="-55" y2="8" stroke="var(--star-glow)" strokeWidth="0.4" opacity="0.4" />
                <line x1="-45" y1="-8" x2="-45" y2="8" stroke="var(--star-glow)" strokeWidth="0.4" opacity="0.4" />
                <line x1="-35" y1="-8" x2="-35" y2="8" stroke="var(--star-glow)" strokeWidth="0.4" opacity="0.4" />
                
                {/* Solar Panels (Right) */}
                <rect x="25" y="-8" width="40" height="16" rx="1.5" fill="none" stroke="var(--star-glow)" strokeWidth="0.8" opacity="0.4" />
                <line x1="25" y1="0" x2="65" y2="0" stroke="var(--star-glow)" strokeWidth="0.6" opacity="0.4" />
                <line x1="35" y1="-8" x2="35" y2="8" stroke="var(--star-glow)" strokeWidth="0.4" opacity="0.4" />
                <line x1="45" y1="-8" x2="45" y2="8" stroke="var(--star-glow)" strokeWidth="0.4" opacity="0.4" />
                <line x1="55" y1="-8" x2="55" y2="8" stroke="var(--star-glow)" strokeWidth="0.4" opacity="0.4" />
                
                {/* Connectors */}
                <line x1="-25" y1="0" x2="-10" y2="0" stroke="var(--star-glow)" strokeWidth="1" opacity="0.6" />
                <line x1="10" y1="0" x2="25" y2="0" stroke="var(--star-glow)" strokeWidth="1" opacity="0.6" />
                
                {/* Central Bus / Body */}
                <rect x="-10" y="-14" width="20" height="28" rx="2" fill="var(--ink-deep)" stroke="var(--star-glow)" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="3" fill="var(--ochre)" />
                
                {/* Dish stem */}
                <line x1="0" y1="14" x2="0" y2="24" stroke="var(--star-glow)" strokeWidth="1" />
                
                {/* Parabolic Dish */}
                <path d="M-12,28 C-6,21 6,21 12,28" fill="none" stroke="var(--star-glow)" strokeWidth="1" />
                <line x1="0" y1="24" x2="0" y2="34" stroke="var(--ochre)" strokeWidth="0.8" />
                <circle cx="0" cy="34" r="1.5" fill="var(--ochre)" />
              </g>
              
              {/* Concentric directional signal waves pointing towards ground right */}
              <path d="M72,125 Q95,145 125,160" stroke="var(--ochre)" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.4" />
              <path d="M80,140 Q105,160 135,175" stroke="var(--ochre)" strokeWidth="0.6" strokeDasharray="3 5" opacity="0.25" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Animated Signal Tower silhouette (responsive on all screens including mobile, click to reset drag elements) ── */}
      <motion.div 
        className="absolute bottom-[40px] sm:bottom-[65px] right-[1%] sm:right-[4%] z-30 select-none block pointer-events-auto cursor-pointer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: 1.3 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{ transformOrigin: "bottom right" }}
        onClick={resetElements}
        whileHover={{ scale: 1.35 }}
        whileTap={{ scale: 1.25 }}
        title="Click to reset cosmic elements"
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
        {/* Presenter Text (no capsule wrapper) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 flex items-center gap-2"
        >
          <span className="font-mono-editorial text-[0.68rem] tracking-[0.25em] uppercase text-[#e5c97a] opacity-90 flex items-center gap-2 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5c97a] opacity-80 animate-pulse" />
            IEEE ComSoc Kerala Chapter Presents
          </span>
        </motion.div>

        {/* ── Giant headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="hero-display-text select-text whitespace-nowrap"
          style={{ fontSize: "clamp(2.1rem, 10vw, 9rem)", lineHeight: 0.95, textShadow: "none" }}
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
      </motion.div>
    </section>
  );
}
