"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, GraduationCap, Trophy, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function Highlights() {
  return (
    <section className="relative py-16 px-6 paper-bg overflow-hidden" id="highlights">
      <IllustrationLayer scene="topographic" color="var(--moss)" opacity={0.45} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
            {[
              {
                icon: Calendar,
                label: "Date",
                value: "Sept 5–6",
                sub: "2026",
                color: "var(--ochre)",
              },
              {
                icon: MapPin,
                label: "Venue",
                value: "Saintgits",
                sub: "Autonomous",
                color: "var(--moss)",
              },
              {
                icon: Clock,
                label: "Deadline",
                value: "Aug 25",
                sub: "2026",
                color: "var(--rust)",
              },
              {
                icon: GraduationCap,
                label: "Eligibility",
                value: "UG Only",
                sub: "Students",
                color: "var(--lavender)",
              },
              {
                icon: Trophy,
                label: "Prize Pool",
                value: "₹28,000+",
                sub: "total pool",
                color: "var(--ochre)",
              },
              {
                icon: Users,
                label: "Organizers",
                value: "IEEE ComSoc",
                sub: "Kerala Section",
                color: "var(--teal-soft)",
              },
            ].map((item, i) => (
              <Reveal delay={i * 0.06} key={i}>
                <motion.div
                  className="organic-card hover-lift flex flex-col items-center text-center gap-2 py-5"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  style={{
                    borderRadius: `${1.5 + (i % 3) * 0.5}rem ${1 + (i % 2) * 0.8}rem ${2 + (i % 4) * 0.3}rem ${0.8 + (i % 3) * 0.6}rem`,
                  }}
                >
                  <div style={{ color: item.color }} className="flex-shrink-0">
                    <item.icon className="w-5 h-5 stroke-[1.4]" />
                  </div>
                  <div>
                    <div
                      className="font-display font-bold"
                      style={{ fontSize: "1.15rem", color: "var(--ink-deep)", fontStyle: "italic" }}
                    >
                      {item.value}
                    </div>
                    <div
                      className="font-mono-editorial tracking-widest uppercase mt-0.5"
                      style={{ fontSize: "0.52rem", color: "var(--ink-soft)" }}
                    >
                      {item.sub}
                    </div>
                  </div>
                  <div
                    className="font-mono-editorial tracking-[0.18em] uppercase"
                    style={{ fontSize: "0.5rem", color: item.color, opacity: 0.8 }}
                  >
                    {item.label}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
