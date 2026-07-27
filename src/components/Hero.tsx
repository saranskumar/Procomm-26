"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { Meteors } from "@/registry/magicui/meteors";
import { TealPlanet, NavyPlanet, Satellite, SignalTower } from "@/components/cosmic";

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

  // Separate motion values for gyroscope tilt parallax (so drag is never overwritten)
  const gyroSatX = useMotionValue(0);
  const gyroSatY = useMotionValue(0);
  const gyroLPX = useMotionValue(0);
  const gyroLPY = useMotionValue(0);
  const gyroRPX = useMotionValue(0);
  const gyroRPY = useMotionValue(0);

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

    // Sensitivity multipliers per element (responsive phone tilt parallax)
    const SATELLITE_SENSITIVITY = { x: 2.2, y: 1.8 };
    const LEFT_PLANET_SENSITIVITY = { x: 1.5, y: 1.2 };
    const RIGHT_PLANET_SENSITIVITY = { x: 2.0, y: 1.6 };

    // Smoothing factor — responsive fluid movement
    const SMOOTH = 0.08;

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

      // Clamp to ±45 degrees for generous responsive tilt movement
      const clampedDx = Math.max(-45, Math.min(45, dx));
      const clampedDy = Math.max(-45, Math.min(45, dy));

      targetSatX = clampedDx * SATELLITE_SENSITIVITY.x;
      targetSatY = clampedDy * SATELLITE_SENSITIVITY.y;
      targetLPX  = clampedDx * LEFT_PLANET_SENSITIVITY.x;
      targetLPY  = clampedDy * LEFT_PLANET_SENSITIVITY.y;
      targetRPX  = clampedDx * RIGHT_PLANET_SENSITIVITY.x;
      targetRPY  = clampedDy * RIGHT_PLANET_SENSITIVITY.y;
    };

    // Smooth interpolation loop (modifies gyro motion values ONLY)
    const tick = () => {
      gyroSatX.set(gyroSatX.get() + (targetSatX - gyroSatX.get()) * SMOOTH);
      gyroSatY.set(gyroSatY.get() + (targetSatY - gyroSatY.get()) * SMOOTH);
      gyroLPX.set(gyroLPX.get() + (targetLPX - gyroLPX.get()) * SMOOTH);
      gyroLPY.set(gyroLPY.get() + (targetLPY - gyroLPY.get()) * SMOOTH);
      gyroRPX.set(gyroRPX.get() + (targetRPX - gyroRPX.get()) * SMOOTH);
      gyroRPY.set(gyroRPY.get() + (targetRPY - gyroRPY.get()) * SMOOTH);
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
        <motion.div style={{ x: gyroLPX, y: gyroLPY }}>
          <TealPlanet />
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
        <motion.div style={{ x: gyroRPX, y: gyroRPY }}>
          <NavyPlanet />
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
        <motion.div style={{ x: gyroSatX, y: gyroSatY }}>
          <motion.div
            style={{ y: useTransform(scrollY, [0, 400], [0, -25]) }}
          >
            <div className="scale-60 sm:scale-85 lg:scale-100 origin-top-left">
              <Satellite />
            </div>
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
        <SignalTower />
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
