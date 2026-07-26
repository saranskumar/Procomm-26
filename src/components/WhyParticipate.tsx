"use client";

import { motion } from "framer-motion";
import { Compass, Handshake, Award } from "lucide-react";
import Reveal from "@/components/Reveal";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function WhyParticipate() {
  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ backgroundColor: "var(--paper)" }}
      id="why"
    >
      <IllustrationLayer scene="hills" color="var(--moss)" opacity={0.6} animated />

      <div className="relative z-10 max-w-7xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="chapter-label">Competition Value</span>
          <h2
            className="editorial-headline mt-2"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Why Participate?
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-text">
          {[
            {
              num: "I",
              icon: Compass,
              title: "Industry Exposure",
              body: "Present your engineering mockups directly to senior technologists and founders from premier hardware and software organizations.",
              accent: "var(--ochre)",
            },
            {
              num: "II",
              icon: Handshake,
              title: "Mentorship & Networking",
              body: "Shortlisted ideas receive dedicated 1-on-1 industry mentor guidance to mature and polish technical layouts.",
              accent: "var(--moss)",
            },
            {
              num: "III",
              icon: Award,
              title: "Recognition & Prizes",
              body: "Earn IEEE ComSoc certificates, win cash grants from a ₹1,00,000+ pool, and secure university credits.",
              accent: "var(--lavender)",
            },
          ].map((card, i) => (
            <Reveal delay={i * 0.12} key={i}>
              <motion.div
                className="organic-card hover-lift flex flex-col gap-5 h-full relative overflow-hidden"
                whileHover={{ y: -6, transition: { duration: 0.35 } }}
                style={{
                  borderRadius: `${2 + i * 0.3}rem ${1 + i * 0.5}rem ${2.5 - i * 0.2}rem ${1.2 + i * 0.4}rem`,
                }}
              >
                {/* Roman numeral watermark */}
                <div
                  className="absolute top-3 right-4 font-display font-bold pointer-events-none select-none"
                  style={{
                    fontSize: "4rem",
                    color: card.accent,
                    opacity: 0.08,
                    fontStyle: "italic",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {card.num}
                </div>

                <div style={{ color: card.accent }} className="flex-shrink-0">
                  <card.icon className="w-8 h-8 stroke-[1.2]" />
                </div>

                <div
                  className="w-8 h-[2px]"
                  style={{ backgroundColor: card.accent }}
                />

                <h3
                  className="font-display font-bold"
                  style={{ fontSize: "1.4rem", fontStyle: "italic", color: "var(--ink-deep)" }}
                >
                  {card.title}
                </h3>

                <p
                  className="font-body"
                  style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.7 }}
                >
                  {card.body}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
