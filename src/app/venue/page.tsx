import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IllustrationLayer from "@/components/IllustrationLayer";
import VenueBanner from "@/components/VenueBanner";
import WaveDivider from "@/components/WaveDivider";
import Link from "next/link";
import { MapPin, Calendar, Globe, Plane, Train, Bus, Map } from "lucide-react";

export const metadata = {
  title: "Venue | PROCOMM '26",
  description: "PROCOMM '26 is hosted at Saintgits College of Engineering (Autonomous), Kottayam, Kerala. Find directions and accommodation details.",
};

export default function VenuePage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <Header />
      <main className="flex-grow">

        {/* ── Banner ── */}
        <VenueBanner />

        {/* ── About the Venue ── */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--ivory)" }}
        >
          <IllustrationLayer scene="brushwork" color="var(--ink-soft)" opacity={0.18} />
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div className="flex flex-col gap-6">
              <span className="chapter-label">About the Venue</span>
              <h2
                className="editorial-headline"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Saintgits College<br />of Engineering
              </h2>
              <div className="w-12 h-[2px]" style={{ backgroundColor: "var(--ochre)" }} />
              <p
                className="font-body select-text"
                style={{ fontSize: "0.95rem", color: "var(--ink-mid)", lineHeight: 1.8 }}
              >
                Saintgits College of Engineering (Autonomous) is one of Kerala's premier technical institutions, recognized for its state-of-the-art infrastructure, research facilities, and active IEEE student branches. Located in Kottayam, the campus provides an ideal environment for the grand finale of PROCOMM '26.
              </p>
              <p
                className="font-body select-text"
                style={{ fontSize: "0.9rem", color: "var(--ink-soft)", lineHeight: 1.8 }}
              >
                The venue includes large auditoriums, seminar halls, electronics labs, and ample networking areas — making it the perfect stage for project demonstrations and jury evaluations.
              </p>

              <div className="flex flex-col gap-3 mt-2 select-text">
                {[
                  { icon: MapPin, label: "Address", value: "Pathamuttom P.O., Kottayam, Kerala — 686532" },
                  { icon: Calendar, label: "Event Dates", value: "September 5th & 6th, 2026" },
                  { icon: Globe, label: "Website", value: "saintgits.org" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <item.icon className="w-5 h-5 flex-shrink-0" style={{ color: "var(--ochre)", opacity: 0.75 }} />
                    <div>
                      <div
                        className="font-mono-editorial tracking-widest uppercase"
                        style={{ fontSize: "0.55rem", color: "var(--ochre)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="font-body mt-0.5"
                        style={{ fontSize: "0.875rem", color: "var(--ink-deep)" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus illustration */}
            <div>
              <div
                className="w-full aspect-video flex items-end justify-end overflow-hidden hover-lift"
                style={{
                  backgroundColor: "var(--paper)",
                  border: "1.5px solid var(--paper-dark)",
                  borderRadius: "2rem 1.2rem 2.5rem 1rem",
                }}
              >
                {/* Stylized campus illustration */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 600 400"
                  fill="none"
                  stroke="var(--ink-deep)"
                  strokeWidth="0.8"
                  opacity="0.45"
                  aria-label="Stylized campus illustration"
                >
                  <line x1="0" y1="360" x2="600" y2="360" strokeDasharray="6 4" opacity="0.3" />
                  <rect x="150" y="160" width="320" height="200" rx="2" />
                  {[170, 210, 250, 290, 330, 370, 410, 450].map((x, i) => (
                    <line key={i} x1={x} y1="160" x2={x} y2="360" opacity="0.3" />
                  ))}
                  <line x1="150" y1="230" x2="470" y2="230" opacity="0.4" />
                  <line x1="150" y1="300" x2="470" y2="300" opacity="0.4" />
                  {[165, 220, 275, 330, 385, 435].map((x, i) => (
                    <rect key={i} x={x} y="170" width="18" height="28" rx="1" opacity="0.5" />
                  ))}
                  {[165, 220, 275, 330, 385, 435].map((x, i) => (
                    <rect key={i} x={x} y="240" width="18" height="28" rx="1" opacity="0.4" />
                  ))}
                  <rect x="50" y="220" width="90" height="140" rx="2" opacity="0.6" />
                  <path d="M 50 220 L 95 185 L 140 220 Z" opacity="0.5" />
                  <line x1="95" y1="185" x2="95" y2="220" opacity="0.4" />
                  <path d="M 270 360 L 270 300 Q 310 280 350 300 L 350 360" opacity="0.5" />
                  <path d="M 280 360 L 280 308 Q 310 292 340 308 L 340 360" opacity="0.3" />
                  <path d="M 150 160 L 310 100 L 470 160" opacity="0.5" />
                  <line x1="310" y1="100" x2="310" y2="60" />
                  <path d="M 310 60 L 340 70 L 310 80" fill="none" opacity="0.6" />
                  {[60, 520].map((x, i) => (
                    <g key={i} opacity="0.4">
                      <path d={`M ${x} 360 Q ${x - 5} 310 ${x} 260 Q ${x + 5} 310 ${x} 360`} />
                      <path d={`M ${x} 300 Q ${x - 15} 280 ${x} 255 Q ${x + 15} 280 ${x} 300`} />
                      <ellipse cx={x} cy="260" rx="20" ry="25" opacity="0.35" />
                    </g>
                  ))}
                  {[0, 1, 2].map((i) => (
                    <path
                      key={i}
                      d={`M ${310 - (i + 1) * 12} ${55 + i * 8} Q 310 ${45 + i * 8} ${310 + (i + 1) * 12} ${55 + i * 8}`}
                      strokeDasharray="3 3"
                      opacity={0.3 - i * 0.07}
                    />
                  ))}
                  <path d="M 200 360 Q 310 350 420 360" opacity="0.3" />
                </svg>
              </div>
              <p
                className="font-mono-editorial text-center mt-3 tracking-widest uppercase"
                style={{ fontSize: "0.52rem", color: "var(--ink-soft)" }}
              >
                Saintgits College of Engineering — Illustrated
              </p>
            </div>
          </div>
        </section>

        {/* ── Wave: About → Reach ── */}
        <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

        {/* ── How to Reach ── */}
        <section
          className="relative py-28 px-6 overflow-hidden topo-bg"
          style={{ backgroundColor: "var(--paper)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="chapter-label">Directions</span>
              <h2
                className="editorial-headline mt-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                How to Reach
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  mode: Plane,
                  title: "By Air",
                  color: "var(--lavender)",
                  desc: "Nearest airport is Cochin International Airport (COK), ~60 km away. Regular taxi and cab services available to Kottayam.",
                },
                {
                  mode: Train,
                  title: "By Train",
                  color: "var(--moss)",
                  desc: "Kottayam Railway Station is the nearest railhead, well-connected to major cities. Autos and cabs available to the college.",
                },
                {
                  mode: Bus,
                  title: "By Road",
                  color: "var(--ochre)",
                  desc: "Saintgits is 14 km from Kottayam town on the Kottayam–Changanacherry road. KSRTC buses and private cabs are readily available.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="organic-card hover-lift flex flex-col gap-4"
                  style={{
                    borderRadius: `${1.8 + i * 0.3}rem ${1.2 + i * 0.4}rem ${2.2 - i * 0.2}rem ${1 + i * 0.5}rem`,
                  }}
                >
                  <div style={{ color: item.color }} className="flex-shrink-0">
                    <item.mode className="w-8 h-8 stroke-[1.2]" />
                  </div>
                  <h3
                    className="font-display font-bold"
                    style={{ fontSize: "1.2rem", fontStyle: "italic", color: "var(--ink-deep)" }}
                  >
                    {item.title}
                  </h3>
                  <div className="w-8 h-[1.5px]" style={{ backgroundColor: item.color, opacity: 0.6 }} />
                  <p
                    className="font-body select-text"
                    style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.75 }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Google Map Embed */}
            <div
              className="mt-12 w-full overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
              style={{
                borderRadius: "1.5rem",
                border: "1.5px solid var(--paper-dark)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.9851992881363!2d76.548784474979!3d9.510014881274149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ed484f475a7%3A0xea66b5d0e55062ca!2sSaintgits%20College%20of%20Engineering%20(Autonomous)%2C%20Kottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1785072325985!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Saintgits College of Engineering Google Map Location"
              />
            </div>
          </div>
        </section>

        {/* ── Wave: Reach → Accommodation ── */}
        <WaveDivider fromColor="var(--paper)" toColor="var(--ivory)" flip />

        {/* ── Accommodation ── */}
        <section
          className="relative py-24 px-6 overflow-hidden"
          style={{ backgroundColor: "var(--ivory)" }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <span className="chapter-label">Stay</span>
            <h2
              className="editorial-headline mt-2"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Accommodation
            </h2>
            <p
              className="font-body mt-6 mx-auto select-text"
              style={{ fontSize: "0.95rem", color: "var(--ink-mid)", lineHeight: 1.75, maxWidth: "54ch" }}
            >
              Participants who require accommodation will be assisted through our organizing team. Limited on-campus hostel facilities and partnered hotels in Kottayam town will be available. Details will be shared post-registration.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn-primary transition-all duration-300 hover:scale-105">
                Register & Get Details
              </Link>
              <a href="mailto:comsoc@ieeekerala.org" className="btn-outline-dark transition-all duration-300 hover:scale-105">
                Email Organizers
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
