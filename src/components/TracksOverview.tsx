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
            <div className="flex gap-3 mt-6 flex-wrap">
              {["24-Hour Hack", "Jury Rounds", "Sept 5–6"].map((tag, i) => (
                <span key={i} className="vintage-stamp">{tag}</span>
              ))}
            </div>
            <Link href="/competition" className="btn-outline-dark mt-8 inline-flex">
              Competition Guidelines <ArrowRight size={12} />
            </Link>
          </Reveal>
        </div>

        {/* Right — Coming Soon Placeholder */}
        <div className="lg:col-span-7 flex justify-center w-full">
          <Reveal delay={0.1}>
            <motion.div
              className="organic-card hover-lift p-8 flex flex-col items-center justify-center text-center gap-6 w-full"
              style={{
                borderRadius: "2rem 1.5rem 2.5rem 1.2rem",
                backgroundColor: "var(--moon)",
                border: "1.5px solid var(--paper-dark)",
                maxWidth: "480px",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)" }}>
                <Compass className="w-7 h-7 float-slow" style={{ color: "var(--ochre)" }} />
              </div>
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-display font-bold" style={{ fontSize: "1.6rem", fontStyle: "italic", color: "var(--ink-deep)" }}>
                  Claim Your Problem Statement
                </h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                  Complete your team registration now to receive the official problem statements and lock in your slot for the 24-hour hackathon.
                </p>
                <Link href="/register" className="btn-ochre text-xs py-2.5 px-6 inline-flex items-center gap-2 mt-2">
                  Register Now <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
