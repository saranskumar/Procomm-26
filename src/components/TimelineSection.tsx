"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function TimelineSection() {
  return (
    <section
      className="relative py-28 px-6 overflow-hidden topo-bg"
      style={{ backgroundColor: "var(--paper)" }}
      id="timeline"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="chapter-label">Key Dates</span>
          <h2
            className="editorial-headline mt-2"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Roadmap Timeline
          </h2>
        </Reveal>

        {/* Chapter-style phases */}
        <div className="flex flex-col gap-0">
          {[
            {
              phase: "Phase 01",
              date: "Aug 21, 2026",
              label: "Registration Closes",
              desc: "Complete all form submissions and team details. Last date to register teams.",
              side: "left",
            },
            {
              phase: "Phase 02",
              date: "Aug 23, 2026",
              label: "Proposal Shortlist",
              desc: "Notification of teams advancing to the final evaluation round.",
              side: "right",
            },
            {
              phase: "Phase 03",
              date: "Sept 5–6, 2026",
              label: "Grand Finale",
              desc: "Physical prototype evaluation at Saintgits College of Engineering (Autonomous), Kottayam, Kerala.",
              side: "left",
            },
          ].map((step, i) => (
            <Reveal delay={i * 0.15} key={i}>
              <div
                className={`flex gap-8 items-start py-8 border-b ${i === 2 ? "border-b-0" : ""}`}
                style={{ borderColor: "var(--paper-dark)" }}
              >
                {/* Phase label */}
                <div className="flex-shrink-0 w-20 sm:w-28">
                  <div
                    className="font-mono-editorial tracking-widest uppercase"
                    style={{ fontSize: "0.52rem", color: "var(--ochre)" }}
                  >
                    {step.phase}
                  </div>
                  <div
                    className="font-display font-bold mt-1"
                    style={{ fontSize: "0.95rem", fontStyle: "italic", color: "var(--ink-deep)" }}
                  >
                    {step.date}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-1">
                  <motion.div
                    className="w-3 h-3 rounded-full border-2 dot-pulse"
                    style={{
                      backgroundColor: i === 2 ? "var(--ochre)" : "var(--paper)",
                      borderColor: "var(--ochre)",
                    }}
                  />
                  {i < 2 && (
                    <div
                      className="w-px flex-1"
                      style={{
                        height: "60px",
                        backgroundColor: "var(--paper-dark)",
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 select-text">
                  <h3
                    className="font-display font-bold"
                    style={{ fontSize: "1.35rem", fontStyle: "italic", color: "var(--ink-deep)" }}
                  >
                    {step.label}
                  </h3>
                  <p
                    className="font-body mt-2"
                    style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.7 }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
