"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Handshake, Award, Calendar, MapPin, Clock, GraduationCap, Trophy, Users } from "lucide-react";
import IntroLoader from "@/components/IntroLoader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import IllustrationLayer from "@/components/IllustrationLayer";

// ── Animated wave divider ────────────────────────────────────────────────────
function WaveDivider({
  fromColor,
  toColor,
  flip = false,
}: {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}) {
  return (
    <div
      className="relative w-full pointer-events-none"
      style={{ backgroundColor: fromColor, lineHeight: 0, zIndex: 1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ transform: flip ? "scaleX(-1)" : undefined, marginBottom: "-2px" }}
      >
        <motion.path
          d="M0,55 C200,22 400,72 600,45 C800,18 1000,65 1200,38 C1340,18 1400,52 1440,48 L1440,80 L0,80 Z"
          fill={toColor}
          animate={{
            d: [
              "M0,55 C200,22 400,72 600,45 C800,18 1000,65 1200,38 C1340,18 1400,52 1440,48 L1440,80 L0,80 Z",
              "M0,42 C200,65 400,25 600,55 C800,68 1000,28 1200,55 C1340,68 1400,35 1440,60 L1440,80 L0,80 Z",
              "M0,55 C200,22 400,72 600,45 C800,18 1000,65 1200,38 C1340,18 1400,52 1440,48 L1440,80 L0,80 Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,68 C180,52 360,76 540,65 C720,54 900,74 1080,62 C1260,50 1380,70 1440,66 L1440,80 L0,80 Z"
          fill={toColor}
          opacity="0.55"
          animate={{
            d: [
              "M0,68 C180,52 360,76 540,65 C720,54 900,74 1080,62 C1260,50 1380,70 1440,66 L1440,80 L0,80 Z",
              "M0,62 C180,74 360,56 540,70 C720,78 900,58 1080,70 C1260,78 1380,60 1440,72 L1440,80 L0,80 Z",
              "M0,68 C180,52 360,76 540,65 C720,54 900,74 1080,62 C1260,50 1380,70 1440,66 L1440,80 L0,80 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}

// ── Scroll-reveal wrapper ─────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.78, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isReload = false;
    if (typeof window !== "undefined" && window.performance) {
      const navEntries = window.performance.getEntriesByType("navigation");
      if (navEntries.length > 0) {
        isReload = (navEntries[0] as PerformanceNavigationTiming).type === "reload";
      } else if (window.performance.navigation) {
        isReload = window.performance.navigation.type === 1;
      }
    }

    if (isReload) {
      sessionStorage.removeItem("procomm26_intro_loaded");
      setLoading(true);
    } else {
      const hasLoaded = sessionStorage.getItem("procomm26_intro_loaded");
      if (hasLoaded === "true") setLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("procomm26_intro_loaded", "true");
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <AnimatePresence>
        {loading && <IntroLoader key="loader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <Header />
      <main className="flex-grow">

        {/* ── 1. Hero ── */}
        <Hero />

        {!loading && (
          <>
            {/* ── Wave: Hero → Highlights ── */}
            <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

            {/* ── 2. Event Highlights Strip ── */}
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

            {/* ── Wave: Highlights → About ── */}
            <WaveDivider fromColor="var(--paper)" toColor="var(--ivory)" flip />

            {/* ── 3. About PROCOMM ── */}
            <section className="relative py-28 px-6 overflow-hidden" style={{ backgroundColor: "var(--ivory)" }} id="about">
              <IllustrationLayer scene="brushwork" color="var(--ink-soft)" opacity={0.25} />

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
                      Organizing Committee &amp; History <ArrowRight size={12} />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </section>

            {/* ── Wave: About → Why ── */}
            <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

            {/* ── 4. Why Participate — folded paper cards ── */}
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

            {/* ── Wave: Why → Tracks ── */}
            <WaveDivider fromColor="var(--paper)" toColor="var(--ivory)" flip />

            {/* ── 5. Tracks Overview ── */}
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

            {/* ── Wave: Tracks → Timeline ── */}
            <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

            {/* ── 6. Timeline ── */}
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
                      date: "Aug 25, 2026",
                      label: "Registration Closes",
                      desc: "Complete all form submissions and team details. Last date to register teams.",
                      side: "left",
                    },
                    {
                      phase: "Phase 02",
                      date: "Aug 28, 2026",
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

            {/* ── Wave: Timeline → Prizes ── */}
            <WaveDivider fromColor="var(--paper)" toColor="var(--ink-deep)" />

            {/* ── 7. Prize Pool ── */}
            <section
              className="relative py-28 px-6 overflow-hidden"
              style={{ backgroundColor: "var(--ink-deep)" }}
              id="prizes"
            >
              <IllustrationLayer scene="flowlines" color="var(--star-glow)" opacity={0.6} />
              <IllustrationLayer scene="waves" color="var(--ivory)" opacity={0.5} />

              <div className="relative z-10 max-w-5xl mx-auto text-center">
                <Reveal>
                  <span className="vintage-stamp-light">Rewards</span>
                  <h2
                    className="editorial-headline mt-4"
                    style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--ivory)" }}
                  >
                    ₹28,000+<br />
                    <span style={{ color: "var(--ochre)", opacity: 0.9 }}>Prize Pool</span>
                  </h2>
                  <p
                    className="font-body mt-6 mx-auto"
                    style={{
                      fontSize: "1rem",
                      color: "rgba(250,247,230,0.55)",
                      lineHeight: 1.75,
                      maxWidth: "42ch",
                    }}
                  >
                    Cash grants awarded to top undergraduate communications engineering prototypes.
                  </p>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 select-text">
                  {[
                    { rank: "First Prize", amount: "₹12,000", symbol: "🏆", color: "var(--ochre)" },
                    { rank: "Second Prize", amount: "₹10,000", symbol: "🥈", color: "var(--lavender)" },
                    { rank: "Third Prize", amount: "₹7,000", symbol: "🥉", color: "var(--teal-soft)" },
                  ].map((prize, i) => (
                    <Reveal delay={i * 0.1} key={i}>
                      <div
                        className="organic-card-dark flex flex-col items-center gap-4 py-8"
                        style={{
                          borderRadius: `${1.8 + i * 0.4}rem ${1.2 + i * 0.3}rem ${2.2 - i * 0.2}rem ${1 + i * 0.5}rem`,
                        }}
                      >
                        <span style={{ fontSize: "1.8rem", color: prize.color }}>{prize.symbol}</span>
                        <div>
                          <div
                            className="font-display font-bold"
                            style={{ fontSize: "2.2rem", color: "var(--ivory)", fontStyle: "italic" }}
                          >
                            {prize.amount}
                          </div>
                          <div
                            className="font-mono-editorial tracking-widest uppercase mt-1"
                            style={{ fontSize: "0.52rem", color: prize.color, opacity: 0.8 }}
                          >
                            {prize.rank}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Wave: Prizes → Organizers ── */}
            <WaveDivider fromColor="var(--ink-deep)" toColor="var(--paper)" />

            {/* ── 8. Organizing Committee ── */}
            <section
              className="relative py-24 px-6 overflow-hidden paper-bg"
              style={{ backgroundColor: "var(--paper)" }}
              id="organizers"
            >
              <div className="relative z-10 max-w-7xl mx-auto">
                <Reveal className="text-center mb-16">
                  <span className="chapter-label">Endorsements</span>
                  <h2
                    className="editorial-headline mt-2"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    Organizing Committee &amp; Hosts
                  </h2>
                </Reveal>

                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
                  {[
                    { 
                      name: "IEEE ComSoc", 
                      sub: "Kerala Chapter", 
                      logo: (
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" strokeDasharray="2 2" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          <path d="M2 12h20" />
                        </svg>
                      )
                    },
                    { 
                      name: "IEEE Kerala", 
                      sub: "Section", 
                      logo: (
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <path d="m9 12 2 2 4-4" />
                          <line x1="4" y1="9" x2="20" y2="9" strokeDasharray="1 1" />
                          <line x1="4" y1="15" x2="20" y2="15" strokeDasharray="1 1" />
                        </svg>
                      )
                    },
                    { 
                      name: "Saintgits", 
                      sub: "College of Engineering", 
                      logo: (
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                          <path d="M12 12v10" strokeDasharray="3 3" />
                        </svg>
                      )
                    },
                  ].map((org, i) => (
                    <Reveal delay={i * 0.1} key={i}>
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div
                          className="w-16 h-16 flex items-center justify-center rounded-full"
                          style={{
                            backgroundColor: "var(--moon)",
                            border: "1.5px solid var(--paper-dark)",
                            color: "var(--ochre)",
                          }}
                        >
                          {org.logo}
                        </div>
                        <div
                          className="font-display font-bold"
                          style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--ink-deep)" }}
                        >
                          {org.name}
                        </div>
                        <div
                          className="font-mono-editorial tracking-widest uppercase"
                          style={{ fontSize: "0.52rem", color: "var(--ink-soft)" }}
                        >
                          {org.sub}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Wave: Organizers → CTA ── */}
            <WaveDivider fromColor="var(--paper)" toColor="var(--ink-deep)" flip />

            {/* ── 9. Final CTA ── */}
            <section
              className="relative py-36 px-6 overflow-hidden"
              style={{ backgroundColor: "var(--ink-deep)" }}
              id="cta"
            >
              <IllustrationLayer scene="cosmic" color="var(--ochre)" opacity={0.18} animated />

              {/* Hill transition into footer */}
              <svg
                className="absolute bottom-0 left-0 w-full pointer-events-none"
                viewBox="0 0 1440 80"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,40 C240,10 480,70 720,40 C960,10 1200,65 1440,45 L1440,80 L0,80 Z"
                  fill="var(--ink-deep)"
                  opacity="0.8"
                />
              </svg>

              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <Reveal>
                  <span className="vintage-stamp-light">Call to Action</span>
                  <h2
                    className="editorial-headline mt-6"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 6rem)",
                      color: "var(--ivory)",
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
                      color: "rgba(230,237,245,0.5)",
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
                    style={{ fontSize: "0.55rem", color: "rgba(230,237,245,0.2)" }}
                  >
                    IEEE ComSoc Kerala Chapter · comsoc.ieeekerala.org
                  </p>
                </Reveal>
              </div>
            </section>

          </>
        )}
      </main>
      {!loading && <Footer />}
    </div>
  );
}
