"use client";

import { motion } from "framer-motion";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function ContactBanner() {
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
          d="M0,35 C360,65 720,15 1080,48 C1260,62 1380,38 1440,32 L1440,80 L0,80 Z"
          fill="var(--ivory)"
          animate={{
            d: [
              "M0,35 C360,65 720,15 1080,48 C1260,62 1380,38 1440,32 L1440,80 L0,80 Z",
              "M0,48 C360,42 720,30 1080,62 C1260,48 1380,22 1440,38 L1440,80 L0,80 Z",
              "M0,35 C360,65 720,15 1080,48 C1260,62 1380,38 1440,32 L1440,80 L0,80 Z",
            ]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-36">
        <span className="vintage-stamp-light">Support & Inquiry</span>
        <h1
          className="hero-display-text mt-4"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)", lineHeight: 0.88 }}
        >
          Contact<br />
          <span style={{ color: "var(--ochre)" }}>Us</span>
        </h1>
        <p
          className="font-mono-editorial tracking-widest uppercase mt-4"
          style={{ fontSize: "0.62rem", color: "rgba(250,247,230,0.4)", letterSpacing: "0.25em" }}
        >
          Have questions? Get in touch with PROCOMM &apos;26 organizing team.
        </p>
      </div>
    </section>
  );
}
