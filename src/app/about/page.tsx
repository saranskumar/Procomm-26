"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import AboutBanner from "@/components/AboutBanner";

interface HistoryEdition {
  year: string;
  title: string;
  host?: string;
  organizer?: string;
  format?: string;
  date?: string;
  highlight?: string;
}

const historyEditions: HistoryEdition[] = [
  {
    year: "2020",
    title: "PROCOMM 2020",
    host: "Online",
    organizer: "IEEE ComSoc Kerala Chapter / IEEE Kerala Section",
    format: "Online Student Project Competition",
    highlight: "Inaugural edition conducted online by the Kerala Chapter, creating a state-level platform for student communication engineering projects.",
  },
  {
    year: "2021",
    title: "PROCOMM 2021",
    host: "Online",
    organizer: "IEEE ComSoc Kerala Chapter",
    format: "Project Presentation Competition",
    highlight: "Second online edition. Won by Team Innovators from TKM College of Engineering ($200 prize).",
  },
  {
    year: "2022",
    title: "PROCOMM 2022",
    host: "IEEE ComSoc Kerala Chapter",
    organizer: "IEEE ComSoc Kerala Chapter",
    format: "Communications Project Competition",
    highlight: "Continued the annual PROCOMM series, fostering project innovation across engineering colleges in Kerala.",
  },
  {
    year: "2023",
    title: "PROCOMM 2023",
    host: "Rajiv Gandhi Institute of Technology (RIT), Kottayam",
    date: "October 2, 2023",
    organizer: "IEEE ComSoc Kerala Chapter + RIT SB",
    format: "Communications Project Competition",
    highlight: "Hosted at RIT Kottayam. First prize won by Toc H Institute team for the 'NeuroNav Chair' assistive communication project.",
  },
  {
    year: "2024",
    title: "PROCOMM 2024",
    host: "College of Engineering Perumon",
    date: "September 21, 2024",
    organizer: "IEEE ComSoc Kerala Chapter + CE Perumon",
    format: "2-Round Communication Tech Competition",
    highlight: "Hosted at CE Perumon with multi-stage evaluation focusing on creative communication technology solutions.",
  },
  {
    year: "2025",
    title: "PROCOMM 2025",
    host: "Rajiv Gandhi Institute of Technology (RIT), Kottayam",
    date: "August 2–3, 2025",
    organizer: "IEEE ComSoc Kerala Chapter + RIT SB",
    format: "24-Hour Hardwarethon",
    highlight: "Evolved into a 24-hour hardware competition. Won by Team Surge (GEC Thrissur) with a disaster-resilient LoRa base station network.",
  },
  {
    year: "2026",
    title: "PROCOMM '26",
    host: "Saintgits College of Engineering (Autonomous), Kottayam",
    date: "September 5–6, 2026",
    organizer: "IEEE ComSoc Kerala Chapter + Saintgits IEEE SB",
    format: "Flagship 24-Hour Communications Competition",
    highlight: "Premier flagship edition featuring ₹28,000+ prize pool, industry mentorship, and live hardware prototyping.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <Header />

      <main className="flex-grow">
        {/* ── 1. Hero Banner ── */}
        <AboutBanner />

        {/* ── 2. Mission Statement & Story ── */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--paper)" }}
        >
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
            <div>
              <span className="chapter-label">Our Story</span>
              <h2
                className="editorial-headline mt-2 select-text"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Connecting Minds,<br />Building Futures
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 select-text">
              <p
                className="font-body"
                style={{ fontSize: "1.05rem", color: "var(--ink-deep)", lineHeight: 1.8 }}
              >
                The IEEE Communications Society (ComSoc) Kerala Chapter has been a beacon for engineering students, researchers, and industry professionals across Kerala. PROCOMM was created to bridge academic theoretical knowledge with hands-on hardware and network system design.
              </p>
              <p
                className="font-body"
                style={{ fontSize: "0.95rem", color: "var(--ink-mid)", lineHeight: 1.8 }}
              >
                Over successive editions, PROCOMM has evolved from a project presentation competition into a 24-hour flagship hardwarethon where teams build live prototypes, consult with IEEE senior members, and pitch directly to technology founders.
              </p>
            </div>
          </div>
        </section>

        {/* ── Wave: Story → Past Editions (dark) ── */}
        <WaveDivider fromColor="var(--paper)" toColor="var(--ink-deep)" />

        {/* ── 3. Past Editions — Editorial Dark Timeline ── */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--ink-deep)" }}
        >
          {/* Subtle topo lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1440 800"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            <path d="M-100,300 C300,240 700,320 1100,270 C1300,250 1420,280 1540,265" stroke="rgba(245,240,232,0.03)" strokeWidth="1" />
            <path d="M-100,450 C300,400 700,470 1100,420 C1300,400 1420,430 1540,415" stroke="rgba(245,240,232,0.025)" strokeWidth="1" />
            <path d="M-100,600 C300,555 700,620 1100,570 C1300,550 1420,580 1540,565" stroke="rgba(245,240,232,0.02)" strokeWidth="1" />
          </svg>

          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-20">
              <span
                className="font-mono-editorial text-[0.6rem] tracking-[0.3em] uppercase block mb-3"
                style={{ color: "var(--ochre)", opacity: 0.8 }}
              >
                Legacy & Archive
              </span>
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontStyle: "italic",
                  color: "var(--ivory)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                }}
              >
                Past<br />
                <span style={{ color: "var(--ochre)" }}>Editions</span>
              </h2>
            </div>

            {/* Timeline rows */}
            <div className="flex flex-col">
              {historyEditions.map((edition, idx) => (
                <div
                  key={idx}
                  className="group"
                >
                  {/* Top rule */}
                  <div
                    className="w-full h-px"
                    style={{ backgroundColor: "rgba(245,240,232,0.1)" }}
                  />

                  <div className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr_300px] gap-6 md:gap-10 py-8 md:py-10 items-start transition-all duration-300 group-hover:bg-white/[0.02] px-2 -mx-2 rounded-lg">

                    {/* Year — Giant editorial number */}
                    <div className="flex flex-col gap-1">
                      <span
                        className="font-display font-bold select-none"
                        style={{
                          fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                          fontStyle: "italic",
                          color: "rgba(245,240,232,0.12)",
                          lineHeight: 1,
                          transition: "color 0.3s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--ochre)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.12)")}
                      >
                        {edition.year}
                      </span>
                    </div>

                    {/* Centre — Title, host, format */}
                    <div className="flex flex-col gap-3">
                      <h3
                        className="font-display font-bold select-text"
                        style={{
                          fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)",
                          fontStyle: "italic",
                          color: "var(--ivory)",
                          lineHeight: 1.1,
                        }}
                      >
                        {edition.title}
                      </h3>

                      <div className="flex flex-col gap-1.5 font-mono-editorial text-[0.72rem]">
                        {edition.host && (
                          <div className="select-text" style={{ color: "rgba(245,240,232,0.65)" }}>
                            <span className="text-zinc-500 uppercase tracking-widest text-[0.58rem] mr-2">Host:</span>
                            {edition.host}
                          </div>
                        )}
                        {edition.format && (
                          <div className="select-text" style={{ color: "var(--ochre)" }}>
                            <span className="text-zinc-500 uppercase tracking-widest text-[0.58rem] mr-2">Format:</span>
                            {edition.format}
                          </div>
                        )}
                        {edition.date && (
                          <div className="select-text" style={{ color: "rgba(245,240,232,0.4)" }}>
                            <span className="text-zinc-500 uppercase tracking-widest text-[0.58rem] mr-2">Date:</span>
                            {edition.date}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right — Highlight text (hidden on mobile) */}
                    {edition.highlight && (
                      <p
                        className="hidden md:block font-body leading-relaxed select-text"
                        style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.4)", lineHeight: 1.75 }}
                      >
                        {edition.highlight}
                      </p>
                    )}
                  </div>

                  {/* Bottom rule on last item */}
                  {idx === historyEditions.length - 1 && (
                    <div
                      className="w-full h-px"
                      style={{ backgroundColor: "rgba(245,240,232,0.1)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer — both sections are ink-deep so no wave needed above, hide the built-in top wave */}
      <Footer fromColor="var(--ink-deep)" />
    </div>
  );
}
