"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Reveal from "@/components/Reveal";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function FinalCTA() {
  return (
    <section
      className="relative py-36 px-6 overflow-hidden"
      style={{ backgroundColor: "var(--ivory)" }}
      id="cta"
    >
      <IllustrationLayer scene="cosmic" color="var(--ink-soft)" opacity={0.15} animated />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="vintage-stamp">Call to Action</span>
          <h2
            className="editorial-headline mt-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "var(--ink-deep)",
              lineHeight: 0.92,
            }}
          >
            Is Your<br />
            <span style={{ color: "var(--ochre)" }}>Project</span><br />
            Ready?
          </h2>
          <p
            className="font-body mt-8 mx-auto"
            style={{
              fontSize: "1rem",
              color: "var(--ink-mid)",
              lineHeight: 1.75,
              maxWidth: "36ch",
            }}
          >
            Submit your registration today and pitch your prototype at the flagship 24-hour IEEE Communications Project Competition.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link href="/register" className="btn-ochre" id="cta-register-btn">
                Register Now
              </Link>
            </motion.div>
            <motion.button
              className="btn-secondary"
              onClick={() => alert("Downloading PROCOMM '26 Official Rulebook PDF...")}
              id="cta-rulebook-btn"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            >
              <BookOpen size={14} />
              Download Rulebook
            </motion.button>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <p
            className="font-mono-editorial mt-8 tracking-widest uppercase"
            style={{ fontSize: "0.55rem", color: "var(--ink-soft)" }}
          >
            IEEE ComSoc Kerala Chapter · comsoc.ieeekerala.org
          </p>
        </Reveal>
      </div>
    </section>
  );
}
