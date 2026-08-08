"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import IllustrationLayer from "@/components/IllustrationLayer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Radio, Cpu, ShieldCheck, Brain, Globe } from "lucide-react";

const tracks = [
  {
    icon: Radio,
    title: "5G/6G & Next-Gen Wireless",
    color: "var(--moss)",
    bg: "rgba(74,92,63,0.05)",
    desc: "Develop prototypes focusing on network architectures, protocol optimization, or cognitive radio designs.",
    domains: ["SDR & RF Frontend Prototyping", "Dynamic Spectrum Access", "Cooperative MIMO Designs"],
    projects: ["Software Defined Transceiver for 5G NR", "Cognitive Spectrum Allocation Engine"],
  },
  {
    icon: Cpu,
    title: "IoT & Smart Systems",
    color: "var(--ochre)",
    bg: "rgba(200,146,58,0.05)",
    desc: "Implement low-power sensor nodes, smart energy grids, or edge automation architectures.",
    domains: ["LoRaWAN & NB-IoT Applications", "Energy Harvesting Nodes", "Intelligent Edge Gateways"],
    projects: ["Autonomous Air Quality Mesh Network", "Smart Building Predictive Climate Node"],
  },
  {
    icon: ShieldCheck,
    title: "Network Security & Cryptography",
    color: "var(--rust)",
    bg: "rgba(184,74,42,0.05)",
    desc: "Build mechanisms for secure data routing, blockchain consensus protocols, or threat intelligence.",
    domains: ["Zero Trust Architectures", "Post-Quantum Key Exchange Protocols", "Secure IoT Firmware Booting"],
    projects: ["Decentralized Edge Identity Vault", "Secure Mesh Packet Router"],
  },
  {
    icon: Brain,
    title: "AI/ML in Communications",
    color: "var(--teal-soft)",
    bg: "rgba(74,122,122,0.05)",
    desc: "Train models for predictive channel allocation, anomaly detection, or dynamic resource planning.",
    domains: ["Deep Learning for Channel Estimation", "Predictive Bandwidth Management", "Network Intrusion Detection"],
    projects: ["SDR-Based Radio Anomaly Classifier", "Predictive QoS Engine"],
  },
  {
    icon: Globe,
    title: "Optical & Satellite Communications",
    color: "var(--lavender)",
    bg: "rgba(154,138,176,0.06)",
    desc: "Focus on optical transport, laser communications, or satellite constellation routing.",
    domains: ["Free-Space Optical (FSO) Links", "High-Throughput Satellite Protocols", "Inter-Satellite Link Routing"],
    projects: ["Laser-Based FSO Mesh Bridge", "Constellation Routing Simulator"],
  },
];

const workflowSteps = [
  { label: "Team Registration", desc: "Register your team of 1–4 members online before August 21, 2026. Inter-college teams are permitted." },
  { label: "Abstract Submission", desc: "Submit your solution proposal abstract based on one of the 5 problem statements before August 21, 2026." },
  { label: "Shortlist Announcement", desc: "The list of shortlisted teams advancing to the finals will be announced on August 23, 2026." },
  { label: "Grand Finale", desc: "Participate in the physical 24-hour prototype hackathon and live jury evaluation on Sept 5–6, 2026 at Saintgits College of Engineering." },
];



const faqs = [
  { q: "Is there a registration fee?", a: "No, registration is completely free for all eligible engineering student teams." },
  { q: "What is the maximum team size?", a: "Teams can have a minimum of 1 and a maximum of 4 members. Inter-departmental and inter-college teams are allowed — team members can be from different institutions." },
  { q: "Are simulation projects allowed?", a: "Yes, but projects incorporating physical hardware validation (e.g., SDRs, microcontrollers, or sensor kits) will score significantly higher under Technical Excellence." },
  { q: "Who do I contact for technical support?", a: "Contact official coordinators S Harijith Viswanath at +91 7994274376 or Nayana Raj at +91 90372 99063." },
];

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
      style={{ backgroundColor: fromColor, stroke: "none", lineHeight: 0, zIndex: 1 }}
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

export default function CompetitionPage() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <Header />
      <main className="flex-grow">

        {/* ── Banner ── */}
        <section
          className="relative w-full min-h-[50vh] flex flex-col justify-end overflow-hidden"
          style={{ backgroundColor: "var(--ink-deep)" }}
        >
           <IllustrationLayer scene="brushwork" color="var(--lavender)" opacity={0.3} />
          <IllustrationLayer scene="flowlines" color="var(--star-glow)" opacity={0.45} />
          <svg
            className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M0,45 C360,10 720,70 1080,40 C1260,22 1380,55 1440,50 L1440,80 L0,80 Z"
              fill="var(--ivory)"
              animate={{
                d: [
                  "M0,45 C360,10 720,70 1080,40 C1260,22 1380,55 1440,50 L1440,80 L0,80 Z",
                  "M0,55 C360,35 720,50 1080,62 C1260,35 1380,40 1440,48 L1440,80 L0,80 Z",
                  "M0,45 C360,10 720,70 1080,40 C1260,22 1380,55 1440,50 L1440,80 L0,80 Z",
                ],
              }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-36">
            <span className="vintage-stamp-light">Guidelines</span>
            <h1
              className="hero-display-text mt-4"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)", lineHeight: 0.88 }}
            >
              Competition<br />
              <span style={{ color: "var(--ochre)" }}>Rules</span>
            </h1>
            <p
              className="font-mono-editorial tracking-widest uppercase mt-4"
              style={{ fontSize: "0.62rem", color: "rgba(230,237,245,0.4)", letterSpacing: "0.25em" }}
            >
              Tracks · Judging · Workflow · FAQ
            </p>
          </div>
        </section>

        {/* ── 1. Tracks Explorer ── */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--ivory)" }}
          id="tracks"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="chapter-label">Domain Pillars</span>
              <h2
                className="editorial-headline mt-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Competition Tracks
              </h2>
            </div>

            {/* Problem Statements & 2-Round Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                {
                  id: "01",
                  title: "Smart Safety Helmet for Industrial Workers",
                  target: "Miners, construction site workers, archeologists, inspection agents for dam, toxic land sites",
                  desc: "Detects falls, impacts, toxic gases, and worker inactivity using onboard sensors. Sends real-time emergency alerts with worker location for rapid rescue and response.",
                },
                {
                  id: "02",
                  title: "Smart Water Tank Health Monitoring System",
                  target: "Residential & Industrial Water Infrastructure",
                  desc: "Continuously monitors water quality parameters such as pH, turbidity, TDS, temperature, and water level. Alerts users to contamination or unsafe water conditions through a mobile or web dashboard.",
                },
                {
                  id: "03",
                  title: "Smart Rubber Plantation Worker Safety System",
                  target: "Remote Plantation Workers",
                  desc: "Monitors worker location, fall events, and vital parameters in remote plantation environments. Provides SOS alerts and long-range communication for quick emergency assistance.",
                },
                {
                  id: "04",
                  title: "Machine Health Monitoring System Using Standard Industrial Protocols",
                  target: "Manufacturing Plants, Assembly Lines, & Industrial Machinery",
                  desc: "Monitors machine vibration, temperature, current, and other health parameters for predictive maintenance. Uses standard industrial communication protocols such as CAN, Modbus RTU/TCP, or OPC UA for reliable data acquisition and monitoring.",
                },
                {
                  id: "05",
                  title: "Smart Bridge Structural Health Monitoring System",
                  target: "Bridges, Overpasses, & Civil Infrastructure",
                  desc: "Monitors bridge integrity by detecting vibration, strain, tilt, crack propagation, and corrosion. Uses accelerometers, strain gauges, and tilt sensors with CAN, RS-485 (Modbus), or LoRa communication to provide real-time structural health monitoring and maintenance alerts.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="organic-card hover-lift p-6 flex flex-col gap-4 border select-text"
                  style={{
                    backgroundColor: "var(--moon)",
                    borderColor: "var(--paper-dark)",
                    borderRadius: "1.5rem",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-editorial text-xs font-bold" style={{ color: "var(--ochre)" }}>
                      PROBLEM STATEMENT {item.id}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl" style={{ fontStyle: "italic", color: "var(--ink-deep)" }}>
                    {item.title}
                  </h3>
                  <div className="font-mono-editorial text-[0.65rem] tracking-wider uppercase text-zinc-500">
                    Target: {item.target}
                  </div>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Hackathon Rounds Structure */}
            <div className="mt-16 p-8 border rounded-2xl" style={{ backgroundColor: "var(--paper)", borderColor: "var(--paper-dark)" }}>
              <div className="text-center mb-8">
                <span className="chapter-label">Structure</span>
                <h3 className="editorial-headline text-2xl md:text-3xl mt-1">Guidelines</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl border bg-white flex flex-col justify-between" style={{ borderColor: "var(--paper-dark)" }}>
                  <div>
                    <div className="font-mono-editorial text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">Round 1</div>
                    <h4 className="font-display font-bold text-lg mb-2">Abstract Submission & Presentation</h4>
                    <ul className="font-body text-xs space-y-2.5 text-zinc-600 list-disc pl-4">
                      <li>Students can participate in teams of a maximum of 4 members.</li>
                      <li>Abstract presentation time limit: 10 minutes.</li>
                      <li>Mode of presentation: Google Meet</li>
                      <li>The presentation must not exceed 20 slides.</li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-dashed border-zinc-300/60 font-mono-editorial text-[9px] uppercase tracking-wider text-amber-700 font-bold">
                    * Abstract presentation templates will be shared shortly
                  </div>
                </div>
                <div className="p-6 rounded-xl border bg-white" style={{ borderColor: "var(--paper-dark)" }}>
                  <div className="font-mono-editorial text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">Round 2</div>
                  <h4 className="font-display font-bold text-lg mb-2">In-Person 24-Hour Hackathon</h4>
                  <ul className="font-body text-xs space-y-2 text-zinc-600 list-disc pl-4">
                    <li>Shortlisted teams from Round 1 will be invited to participate in an in-person, 24-hour hackathon at Saintgits College of Engineering (Autonomous), Kottayam.</li>
                    <li>Participants will build, prototype, and demonstrate their working solution live before the jury.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Wave: Tracks → Workflow ── */}
        <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

        {/* ── 2. Competition Workflow ── */}
        <section
          className="relative py-28 px-6 overflow-hidden paper-bg topo-bg"
          style={{ backgroundColor: "var(--paper)" }}
          id="workflow"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="chapter-label">Process</span>
              <h2
                className="editorial-headline mt-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Competition Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="organic-card hover-lift flex flex-col gap-3"
                  whileHover={{ y: -5 }}
                  style={{
                    borderRadius: `${1.5 + (i % 3) * 0.4}rem ${1 + (i % 2) * 0.6}rem ${2 - (i % 4) * 0.2}rem ${0.8 + (i % 3) * 0.5}rem`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono-editorial" style={{ fontSize: "0.7rem", color: "var(--ochre)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1" style={{ backgroundColor: "var(--paper-dark)" }} />
                  </div>
                  <h4
                    className="font-display font-bold"
                    style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--ink-deep)" }}
                  >
                    {step.label}
                  </h4>
                  <p
                    className="font-body select-text"
                    style={{ fontSize: "0.8rem", color: "var(--ink-mid)", lineHeight: 1.65 }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Wave: Workflow → Downloads (Commented) ── */}
        {/* <WaveDivider fromColor="var(--paper)" toColor="var(--ink-deep)" flip /> */}

        {/* ── 4. Template Downloads (Commented out per user request) ── */}
        {/* <section
          className="relative py-24 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--ink-deep)" }}
          id="downloads"
        >
          <IllustrationLayer scene="flowlines" color="var(--star-glow)" opacity={0.4} />
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <span className="vintage-stamp-light">Resources</span>
            <h2
              className="editorial-headline mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--ivory)" }}
            >
              Templates &amp; Documents
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
              {[
                { name: "Abstract Template", ext: ".docx", color: "var(--ochre)" },
                { name: "Project Report Format", ext: ".pdf", color: "var(--lavender)" },
                { name: "Presentation Deck", ext: ".pptx", color: "var(--teal-soft)" },
              ].map((doc, i) => (
                <motion.button
                  key={i}
                  onClick={() => alert(`Downloading ${doc.name}${doc.ext}...`)}
                  className="organic-card-dark flex flex-col items-center gap-4 py-8 cursor-pointer transition-all hover:opacity-85"
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    borderRadius: `${1.5 + i * 0.3}rem ${1 + i * 0.4}rem ${2 - i * 0.2}rem ${0.8 + i * 0.5}rem`,
                  }}
                  aria-label={`Download ${doc.name}`}
                >
                  <Download className="w-6 h-6" style={{ color: doc.color }} />
                  <div>
                    <div
                      className="font-body font-medium"
                      style={{ fontSize: "0.85rem", color: "var(--ivory)" }}
                    >
                      {doc.name}
                    </div>
                    <div
                      className="font-mono-editorial mt-1 tracking-widest uppercase"
                      style={{ fontSize: "0.55rem", color: doc.color, opacity: 0.8 }}
                    >
                      {doc.ext}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section> */}

        {/* ── Wave: Downloads → FAQ (Commented) ── */}
        {/* <WaveDivider fromColor="var(--ink-deep)" toColor="var(--paper)" /> */}

        {/* ── 5. FAQ ── */}
        <section
          className="relative py-28 px-6 paper-bg overflow-hidden"
          style={{ backgroundColor: "var(--paper)" }}
          id="faq"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="chapter-label">Queries</span>
              <h2
                className="editorial-headline mt-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Frequently Asked
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "var(--moon)",
                    border: "1.5px solid var(--paper-dark)",
                    borderRadius: `${1.2 + (i % 3) * 0.3}rem`,
                    overflow: "hidden",
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span
                      className="font-body font-semibold"
                      style={{ fontSize: "0.9rem", color: "var(--ink-deep)" }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className="flex-shrink-0 transition-transform"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "var(--ink-soft)",
                        transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="px-5 pb-5 select-text"
                          style={{
                            borderTop: "1px solid var(--paper-dark)",
                            paddingTop: "1rem",
                          }}
                        >
                          <p
                            className="font-body"
                            style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.75 }}
                          >
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer fromColor="var(--paper)" />
    </div>
  );
}
