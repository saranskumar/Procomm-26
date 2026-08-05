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
            <Link href="/problem" className="btn-outline-dark mt-8 inline-flex">
              Competition Guidelines <ArrowRight size={12} />
            </Link>
          </Reveal>
        </div>

        {/* Right — 3 Official Problem Statements */}
        <div className="lg:col-span-7 flex flex-col gap-5 w-full">
          {[
            {
              id: "01",
              title: "Smart Safety Helmet for Industrial Workers",
              badge: "Industrial Safety",
              desc: "Detects falls, impacts, toxic gases, and worker inactivity using onboard sensors. Sends real-time emergency alerts with worker location for rapid rescue in mining, construction, and dam inspection sites.",
            },
            {
              id: "02",
              title: "Smart Water Tank Health Monitoring System",
              badge: "Water & Health",
              desc: "Continuously monitors water quality parameters such as pH, turbidity, TDS, temperature, and water level. Alerts users to contamination or unsafe water conditions through a mobile or web dashboard.",
            },
            {
              id: "03",
              title: "Smart Rubber Plantation Worker Safety System",
              badge: "Remote Safety",
              desc: "Monitors worker location, fall events, and vital parameters in remote plantation environments. Provides SOS emergency alerts and long-range wireless communication.",
            },
          ].map((item, idx) => (
            <Reveal key={idx} delay={0.1 * (idx + 1)}>
              <div
                className="organic-card hover-lift p-6 flex flex-col gap-3 w-full border"
                style={{
                  backgroundColor: "var(--moon)",
                  borderColor: "var(--paper-dark)",
                  borderRadius: "1.25rem",
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono-editorial text-xs font-bold" style={{ color: "var(--ochre)" }}>
                    STATEMENT {item.id}
                  </span>
                  <span className="font-mono-editorial text-[0.6rem] tracking-wider uppercase px-2.5 py-0.5 rounded-full" style={{ backgroundColor: "var(--paper)", color: "var(--ink-soft)" }}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg" style={{ fontStyle: "italic", color: "var(--ink-deep)" }}>
                  {item.title}
                </h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
