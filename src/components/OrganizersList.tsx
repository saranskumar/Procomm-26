"use client";

import Reveal from "@/components/Reveal";

export default function OrganizersList() {
  return (
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
  );
}
