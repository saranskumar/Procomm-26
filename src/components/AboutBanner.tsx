"use client";

import IllustrationLayer from "@/components/IllustrationLayer";
import WaveDivider from "@/components/WaveDivider";

export default function AboutBanner() {
  return (
    <section
      className="relative w-full min-h-[45vh] flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: "var(--ink-deep)" }}
    >
      <IllustrationLayer scene="cosmic" color="var(--ochre)" opacity={0.25} animated />
      <IllustrationLayer scene="flowlines" color="var(--star-glow)" opacity={0.5} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-36 w-full">
        <span className="vintage-stamp-light">About Us</span>
        <h1
          className="hero-display-text mt-3"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 1 }}
        >
          About PROCOMM
        </h1>
        <p
          className="font-mono-editorial tracking-widest uppercase mt-3"
          style={{ fontSize: "0.65rem", color: "rgba(250,247,230,0.5)", letterSpacing: "0.25em" }}
        >
          IEEE Communications Society Kerala Chapter
        </p>
      </div>

      {/* Organic Wave Transition into next section background (var(--paper)) */}
      <WaveDivider fromColor="var(--ink-deep)" toColor="var(--paper)" />
    </section>
  );
}
