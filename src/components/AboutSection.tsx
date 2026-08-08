"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function AboutSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ backgroundColor: "var(--ivory)" }} id="about">
      <IllustrationLayer scene="brushwork" color="var(--ink-soft)" opacity={0.25} />

      {/* Organizers & Hosts banner integrated at the top of the About section */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16 pb-10 border-b border-dashed border-zinc-300/30">
        <Reveal delay={0.1}>
          <div className="text-center">
            <span className="font-mono-editorial text-[0.62rem] tracking-[0.25em] uppercase text-zinc-400 select-none block mb-6">
              Organizers & Hosts
            </span>
            <div className="flex flex-nowrap items-center justify-center gap-6 sm:gap-12 md:gap-16 overflow-x-auto py-1">
              <img
                src="/logo/Comsoc Logo New Blue.png"
                alt="IEEE ComSoc Kerala Chapter Logo"
                className="h-7 sm:h-8 md:h-9 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300 object-contain flex-shrink-0"
              />
              <img
                src="/logo/ieee-saint.png"
                alt="IEEE Saintgits Student Branch Logo"
                className="h-9 sm:h-11 md:h-13 w-auto opacity-95 hover:opacity-100 transition-opacity duration-300 object-contain flex-shrink-0"
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left — Large decorative number + heading */}
        <div className="lg:col-span-5">
          <Reveal>
            <div
              className="font-display font-bold pointer-events-none select-none leading-none"
              style={{
                fontSize: "clamp(8rem, 18vw, 14rem)",
                color: "var(--paper)",
                lineHeight: 0.85,
                fontStyle: "italic",
              }}
              aria-hidden="true"
            >
              01
            </div>
            <div style={{ marginTop: "-3rem" }}>
              <span className="chapter-label">Vision &amp; Mission</span>
              <h2
                className="editorial-headline mt-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                About<br />PROCOMM
              </h2>
              <div
                className="mt-4 w-12 h-[2px]"
                style={{ backgroundColor: "var(--ochre)" }}
              />
            </div>
          </Reveal>
        </div>

        {/* Right — Body text + pull quote */}
        <div className="lg:col-span-7 flex flex-col gap-6 select-text">
          <Reveal delay={0.15}>
            <blockquote
              className="pull-quote border-l-2 pl-6"
              style={{ borderColor: "var(--ochre)" }}
            >
              &ldquo;Bridging the gap between academic projects and real-world engineering.&rdquo;
            </blockquote>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="font-body" style={{ fontSize: "1rem", color: "var(--ink-mid)", lineHeight: 1.8 }}>
              PROCOMM is the signature Communications Project Competition designed to challenge student teams to conceptualize, mock up, and present fully-fledged prototypes — building a solid culture of product innovation in networking, wireless design, and cybersecurity.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="font-body" style={{ fontSize: "0.9rem", color: "var(--ink-soft)", lineHeight: 1.8 }}>
              Organized by the IEEE ComSoc Kerala Chapter, PROCOMM introduces students to standard specifications and protocols (IEEE 802.11, 3GPP, IETF RFCs), while connecting them with senior technologists and potential incubation pathways.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <Link href="/about" className="btn-outline-dark">
              Read Our Story <ArrowRight size={12} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
