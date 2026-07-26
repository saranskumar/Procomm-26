import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IllustrationLayer from "@/components/IllustrationLayer";
import AboutBanner from "@/components/AboutBanner";
import WaveDivider from "@/components/WaveDivider";
import { Award, Network, MapPin } from "lucide-react";

export const metadata = {
  title: "About | PROCOMM '26",
  description: "Learn about the organization, history, and objectives of PROCOMM '26 — the flagship IEEE Communications Project Competition.",
};

const objectives = [
  "Foster a culture of hands-on systems design and validation among engineering students.",
  "Introduce students to standard specifications and protocols (IEEE 802.11, 3GPP, IETF RFCs).",
  "Identify high-potential prototypes and guide them towards commercial incubation or academic publication.",
  "Cultivate academic excellence and networking by engaging IEEE student branches across the region.",
];

const committee = {
  advisors: [
    { name: "Dr. Elizabeth Varghese", role: "Chairperson, IEEE ComSoc Kerala Chapter" },
    { name: "Prof. Manoj Kumar P.", role: "Vice-Chair, IEEE Kerala Section" },
    { name: "Dr. Mathew J. Joseph", role: "Principal Advisor, Saintgits College of Engineering (Autonomous)" },
  ],
  core: [
    { name: "Ms. Anjana Harikrishnan", role: "General Program Chair, PROCOMM '26" },
    { name: "Mr. Ranjith R. Nair", role: "Technical Program Chair" },
    { name: "Ms. Parvathy S. Kumar", role: "Finance Chair" },
    { name: "Mr. Sidharth G. Nair", role: "Operations Coordinator" },
  ],
  volunteers: [
    "Anoop S. (Saintgits SB)",
    "Riya Mathews (KIT SB)",
    "Rahul R. (GEC SB)",
    "Sandra K. (TKM SB)",
    "George K. (MEC SB)",
  ],
};

const historyEditions = [
  { year: "2022", host: "Govt. Engineering College, Barton Hill", milestone: "Inaugural edition with 40+ project teams in wireless communications." },
  { year: "2023", host: "TKM College of Engineering, Kollam", milestone: "Expanded to include IoT & smart city grids, drawing 75+ registrations." },
  { year: "2024", host: "Model Engineering College, Thrikkakara", milestone: "Focused on AI/ML in networking and protocol optimization." },
  { year: "2025", host: "Government Engineering College, Thrissur", milestone: "Hosted cybersecurity audits and threat intelligence showcases." },
];

const stats = [
  { value: "400+", label: "Participants" },
  { value: "45+", label: "Colleges" },
  { value: "180+", label: "Projects Submitted" },
  { value: "25+", label: "Industry Judges" },
  { value: "12+", label: "Sponsors & Partners" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <Header />
      <main className="flex-grow">

        {/* ── Banner ── */}
        <AboutBanner />

        {/* ── 1. Vision & Mission / Objectives ── */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--ivory)" }}
        >
          <IllustrationLayer scene="brushwork" color="var(--ink-soft)" opacity={0.2} />

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="chapter-label flex items-center gap-2">
                <span style={{ color: "var(--ochre)" }}>◉</span> Vision &amp; Mission
              </span>
              <h2
                className="editorial-headline"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}
              >
                Core<br />Directives
              </h2>
              <div className="w-12 h-[2px]" style={{ backgroundColor: "var(--ochre)" }} />

              <div className="flex flex-col gap-6 mt-2">
                <div className="transition-transform duration-300 hover:translate-x-1">
                  <h4
                    className="font-body font-semibold uppercase tracking-wider"
                    style={{ fontSize: "0.72rem", color: "var(--moss)" }}
                  >
                    Vision
                  </h4>
                  <p
                    className="font-body mt-2"
                    style={{ fontSize: "0.9rem", color: "var(--ink-mid)", lineHeight: 1.75 }}
                  >
                    To establish Kerala as a hub of systems engineering and protocol innovation by training the next generation of communications engineers.
                  </p>
                </div>
                <div className="transition-transform duration-300 hover:translate-x-1">
                  <h4
                    className="font-body font-semibold uppercase tracking-wider"
                    style={{ fontSize: "0.72rem", color: "var(--moss)" }}
                  >
                    Mission
                  </h4>
                  <p
                    className="font-body mt-2"
                    style={{ fontSize: "0.9rem", color: "var(--ink-mid)", lineHeight: 1.75 }}
                  >
                    To provide engineering students with resources, mentorship, and industrial platforms to build prototypes that solve societal connectivity challenges.
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — Objectives */}
            <div className="lg:col-span-7">
              <div
                className="organic-card hover-lift"
                style={{
                  borderRadius: "2.5rem 1.5rem 2rem 1.2rem",
                  padding: "2.5rem",
                }}
              >
                <h3
                  className="font-display font-bold mb-8"
                  style={{ fontSize: "1.4rem", fontStyle: "italic", color: "var(--ink-deep)" }}
                >
                  PROCOMM Objectives
                </h3>
                <ul className="flex flex-col gap-5 select-text">
                  {objectives.map((obj, idx) => (
                    <li key={idx} className="flex gap-4 items-start transition-transform duration-300 hover:translate-x-1">
                      <span
                        className="font-mono-editorial flex-shrink-0"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--ochre)",
                          width: "1.5rem",
                          textAlign: "right",
                          marginTop: "2px",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p
                        className="font-body"
                        style={{ fontSize: "0.9rem", color: "var(--ink-mid)", lineHeight: 1.7 }}
                      >
                        {obj}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Wave: Vision → Theme ── */}
        <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

        {/* ── 2. Theme of PROCOMM '26 ── */}
        <section
          className="relative py-28 px-6 overflow-hidden topo-bg"
          style={{ backgroundColor: "var(--paper)" }}
        >
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="chapter-label">Focal Area</span>
            <h2
              className="editorial-headline mt-2"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Theme of PROCOMM &apos;26
            </h2>

            <div
              className="organic-card text-left mt-10 hover-lift"
              style={{ borderRadius: "2rem 1.2rem 2.5rem 1rem" }}
            >
              {/* Decorative quote mark */}
              <div
                className="font-display font-bold mb-2 pointer-events-none select-none"
                style={{ fontSize: "5rem", lineHeight: 0.7, color: "var(--ochre)", opacity: 0.2, fontStyle: "italic" }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <h3
                className="font-display font-bold"
                style={{ fontSize: "1.5rem", fontStyle: "italic", color: "var(--ink-deep)" }}
              >
                Next-Gen Communication Systems
              </h3>
              <p
                className="font-body mt-4 select-text"
                style={{ fontSize: "0.9rem", color: "var(--ink-mid)", lineHeight: 1.8 }}
              >
                The rapid convergence of AI with telecommunications, the deployment of 5G Non-Public Networks, and the design of low-power IoT networks are shifting the paradigms of networking. Under this light, the theme for this edition challenges students to construct systems utilizing Software Defined Radios, secure cryptographic key exchanges, or network telemetry platforms.
              </p>
            </div>
          </div>
        </section>

        {/* ── Wave: Theme → Orgs ── */}
        <WaveDivider fromColor="var(--paper)" toColor="var(--ivory)" flip />

        {/* ── 3. About IEEE & ComSoc ── */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--ivory)" }}
        >
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="chapter-label">Parent Organizations</span>
              <h2
                className="editorial-headline mt-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                About IEEE &amp; ComSoc
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "IEEE",
                  icon: Award,
                  color: "var(--moss)",
                  text: "The Institute of Electrical and Electronics Engineers is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.",
                },
                {
                  name: "IEEE ComSoc",
                  icon: Network,
                  color: "var(--ochre)",
                  text: "The IEEE Communications Society promotes technological innovation and fosters international technical exchanges in the area of communications and information networking.",
                },
                {
                  name: "ComSoc Kerala",
                  icon: MapPin,
                  color: "var(--lavender)",
                  text: "The local chapter provides members in Kerala with technical lectures, symposia, research exposure, and specialized workshops like PROCOMM.",
                },
              ].map((org, i) => (
                <div
                  key={i}
                  className="organic-card hover-lift flex flex-col gap-4"
                  style={{
                    borderRadius: `${1.8 + i * 0.3}rem ${1.2 + i * 0.4}rem ${2.2 - i * 0.2}rem ${1 + i * 0.5}rem`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <org.icon className="w-5 h-5 stroke-[1.4]" style={{ color: org.color }} />
                    <h3
                      className="font-display font-bold"
                      style={{ fontSize: "1.15rem", fontStyle: "italic", color: "var(--ink-deep)" }}
                    >
                      {org.name}
                    </h3>
                  </div>
                  <div className="w-8 h-[1.5px]" style={{ backgroundColor: org.color, opacity: 0.5 }} />
                  <p
                    className="font-body select-text"
                    style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.75 }}
                  >
                    {org.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Wave: Orgs → Legacy ── */}
        <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

        {/* ── 5. Past Editions ── */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--ivory)" }}
        >
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="chapter-label">Legacy</span>
              <h2
                className="editorial-headline mt-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Past Editions
              </h2>
            </div>

            <div className="flex flex-col gap-0">
              {historyEditions.map((edition, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 items-start py-8 border-b select-text hover-lift px-2 rounded-lg"
                  style={{ borderColor: "var(--paper-dark)" }}
                >
                  {/* Year */}
                  <div
                    className="font-display font-bold flex-shrink-0 transition-colors duration-300 hover:text-ochre"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      fontStyle: "italic",
                      color: "var(--paper-dark)",
                      lineHeight: 1,
                      width: "5rem",
                    }}
                    aria-hidden="true"
                  >
                    {edition.year}
                  </div>
                  {/* Dot */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: "var(--ochre)" }}
                    />
                    {idx < historyEditions.length - 1 && (
                      <div
                        className="w-px"
                        style={{ height: "60px", backgroundColor: "var(--paper-dark)" }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="font-display font-bold"
                      style={{ fontSize: "1.2rem", fontStyle: "italic", color: "var(--ink-deep)" }}
                    >
                      {edition.host}
                    </h3>
                    <p
                      className="font-body mt-2"
                      style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.7 }}
                    >
                      {edition.milestone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Wave: Legacy → Stats ── */}
        <WaveDivider fromColor="var(--ivory)" toColor="var(--ink-deep)" />

        {/* ── 6. Statistics ── */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--ink-deep)" }}
        >
          <IllustrationLayer scene="flowlines" color="var(--star-glow)" opacity={0.5} />
          <IllustrationLayer scene="topographic" color="var(--lavender)" opacity={0.15} />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="vintage-stamp-light">Impact Data</span>
              <h2
                className="editorial-headline mt-4"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--ivory)" }}
              >
                Competition History<br />Statistics
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 select-text">
              {stats.map((stat, idx) => (
                <div key={idx} className="illustrated-stat transition-transform duration-300 hover:scale-105">
                  <div className="illustrated-stat-number">{stat.value}</div>
                  <div
                    className="illustrated-stat-label"
                    style={{ color: "rgba(230,237,245,0.4)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}
