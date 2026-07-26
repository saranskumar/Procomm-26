"use client";

import Reveal from "@/components/Reveal";
import IllustrationLayer from "@/components/IllustrationLayer";

export default function PrizePool() {
  return (
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
            { rank: "Second Prize", amount: "₹9,000", symbol: "🥈", color: "var(--lavender)" },
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
  );
}
