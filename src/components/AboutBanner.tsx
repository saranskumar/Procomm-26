"use client";

import { motion } from "framer-motion";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function AboutBanner() {
  return (
    <section
      className="relative w-full min-h-[50vh] flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: "var(--ink-deep)" }}
    >
      <IllustrationLayer scene="cosmic" color="var(--ochre)" opacity={0.25} animated />
      <IllustrationLayer scene="flowlines" color="var(--star-glow)" opacity={0.5} />

      {/* Hill transition */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0,50 C300,15 600,65 900,40 C1100,20 1320,55 1440,48 L1440,80 L0,80 Z"
          fill="var(--ivory)"
          animate={{
            d: [
              "M0,50 C300,15 600,65 900,40 C1100,20 1320,55 1440,48 L1440,80 L0,80 Z",
              "M0,58 C300,32 600,52 900,50 C1100,35 1320,40 1440,55 L1440,80 L0,80 Z",
              "M0,50 C300,15 600,65 900,40 C1100,20 1320,55 1440,48 L1440,80 L0,80 Z",
            ]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-36">
        <span className="vintage-stamp-light">About Us</span>
        <h1
          className="hero-display-text mt-4"
          style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 0.88 }}
        >
          Organi
          <br />
          zation
        </h1>
        <p
          className="font-mono-editorial tracking-widest uppercase mt-4"
          style={{ fontSize: "0.62rem", color: "rgba(250,247,230,0.4)", letterSpacing: "0.25em" }}
        >
          IEEE Communications Society Kerala Chapter
        </p>
      </div>
    </section>
  );
}
