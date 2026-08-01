"use client";

import { motion } from "framer-motion";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function RegisterBanner() {
  return (
    <section
      className="relative w-full min-h-[50vh] flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: "var(--ink-deep)" }}
    >
      <IllustrationLayer scene="brushwork" color="var(--lavender)" opacity={0.25} animated />
      <IllustrationLayer scene="flowlines" color="var(--star-glow)" opacity={0.45} />

      {/* Hill transition */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0,40 C360,80 720,20 1080,60 C1260,75 1380,45 1440,38 L1440,80 L0,80 Z"
          fill="var(--ivory)"
          animate={{
            d: [
              "M0,40 C360,80 720,20 1080,60 C1260,75 1380,45 1440,38 L1440,80 L0,80 Z",
              "M0,52 C360,60 720,38 1080,72 C1260,60 1380,30 1440,48 L1440,80 L0,80 Z",
              "M0,40 C360,80 720,20 1080,60 C1260,75 1380,45 1440,38 L1440,80 L0,80 Z",
            ]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-36">
        <span className="vintage-stamp-light">Submission Portal</span>
        <h1
          className="hero-display-text mt-4"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)", lineHeight: 1 }}
        >
          Registra<span style={{ color: "var(--ochre)" }}>tion</span>
        </h1>
        <p
          className="font-mono-editorial tracking-widest uppercase mt-4"
          style={{ fontSize: "0.62rem", color: "rgba(250,247,230,0.4)", letterSpacing: "0.25em" }}
        >
          Submit your project to PROCOMM &apos;26
        </p>
      </div>
    </section>
  );
}
