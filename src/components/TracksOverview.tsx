"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import Reveal from "@/components/Reveal";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function TracksOverview() {
  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ backgroundColor: "var(--ivory)" }}
      id="tracks"
    >
      <IllustrationLayer scene="cosmic" color="var(--lavender)" opacity={0.3} animated />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left */}
        <div className="lg:col-span-5">
          <Reveal>
            <div
              className="font-display font-bold pointer-events-none select-none"
              style={{
                fontSize: "clamp(7rem, 15vw, 12rem)",
                color: "var(--paper)",
                lineHeight: 0.85,
                fontStyle: "italic",
              }}
              aria-hidden="true"
            >
              02
            </div>
            <div style={{ marginTop: "-2.5rem" }}>
              <span className="chapter-label">Domain Pillars</span>
              <h2
                className="editorial-headline mt-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Problem<br />Statements
              </h2>
            </div>
            <p
              className="font-body mt-6"
              style={{ fontSize: "0.95rem", color: "var(--ink-mid)", lineHeight: 1.75, maxWidth: "42ch" }}
            >
              PROCOMM &apos;26 features core challenges focused on telecom innovation. Registrations are now open. Claim your problem statements and prepare your prototype.
            </p>
            <Link href="/problem" className="btn-primary mt-8 inline-flex items-center gap-2">
              Read All Problem Statements <ArrowRight size={12} />
            </Link>
          </Reveal>
        </div>

        {/* Right — 5 Problem Statements List */}
        <div className="lg:col-span-7 flex flex-col w-full border-t border-zinc-200/60">
          {[
            { id: "01", title: "Smart Safety Helmet for Industrial Workers" },
            { id: "02", title: "Smart Water Tank Health Monitoring System" },
            { id: "03", title: "Smart Rubber Plantation Worker Safety System" },
            { id: "04", title: "Machine Health Monitoring System Using Standard Industrial Protocols" },
            { id: "05", title: "Smart Bridge Structural Health Monitoring System" },
          ].map((item, idx) => (
            <Reveal key={idx} delay={0.06 * (idx + 1)}>
              <Link 
                href="/problem" 
                className="group flex items-center justify-between py-5 border-b border-zinc-200/60 transition-colors duration-300 hover:bg-zinc-50/50 px-4 -mx-4 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  {/* ID */}
                  <span className="font-mono-editorial text-xs font-bold text-zinc-400 group-hover:text-amber-600 transition-colors duration-300">
                    {item.id}
                  </span>
                  {/* Title */}
                  <h3 className="font-display font-semibold text-base sm:text-lg text-ink-deep italic group-hover:text-amber-700 transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>
                </div>
                {/* Arrow */}
                <ArrowRight 
                  size={16} 
                  className="text-zinc-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-4" 
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
