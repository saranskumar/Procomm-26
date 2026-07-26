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

        <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24">
          {[
            { 
              name: "IEEE ComSoc", 
              sub: "Kerala Chapter", 
              logo: (
                <img
                  src="/logo/Comsoc Logo New Blue.png"
                  alt="IEEE ComSoc Kerala Chapter Logo"
                  className="w-12 h-12 object-contain"
                />
              )
            },
            { 
              name: "IEEE Kerala", 
              sub: "Section", 
              logo: (
                <img
                  src="/logo/IEEE Kerala Section Logo.png"
                  alt="IEEE Kerala Section Logo"
                  className="w-12 h-12 object-contain"
                />
              )
            },
            { 
              name: "Saintgits", 
              sub: "College of Engineering", 
              logo: (
                <img
                  src="/logo/saint-logo .png"
                  alt="Saintgits College of Engineering Logo"
                  className="w-11 h-11 object-contain"
                />
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
