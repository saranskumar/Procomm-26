"use client";

import { motion } from "framer-motion";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function VenueBanner() {
  return (
    <section
      className="relative w-full min-h-[50vh] flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: "var(--ink-deep)" }}
    >
      <IllustrationLayer scene="topographic" color="var(--border)" opacity={0.3} />
      <IllustrationLayer scene="flowlines" color="var(--star-glow)" opacity={0.45} />

      {/* Hill transition */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0,30 C360,70 720,20 1080,55 C1260,70 1380,40 1440,35 L1440,80 L0,80 Z"
          fill="var(--ivory)"
          animate={{
            d: [
              "M0,30 C360,70 720,20 1080,55 C1260,70 1380,40 1440,35 L1440,80 L0,80 Z",
              "M0,45 C360,50 720,40 1080,68 C1260,50 1380,30 1440,42 L1440,80 L0,80 Z",
              "M0,30 C360,70 720,20 1080,55 C1260,70 1380,40 1440,35 L1440,80 L0,80 Z",
            ]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-36">
        <span className="vintage-stamp-light">Host Venue</span>
        <h1
          className="hero-display-text mt-4"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)", lineHeight: 0.88 }}
        >
          Saintgits<br />
          <span style={{ color: "var(--ochre)" }}>Kottayam</span>
        </h1>
        <p
          className="font-mono-editorial tracking-widest uppercase mt-4"
          style={{ fontSize: "0.62rem", color: "rgba(250,247,230,0.4)", letterSpacing: "0.25em" }}
        >
          Saintgits College of Engineering (Autonomous) · Kerala
        </p>
      </div>
    </section>
  );
}
