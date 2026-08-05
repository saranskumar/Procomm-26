import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IllustrationLayer from "@/components/IllustrationLayer";
import VenueBanner from "@/components/VenueBanner";
import WaveDivider from "@/components/WaveDivider";
import Link from "next/link";
import { MapPin, Calendar, Globe, Map } from "lucide-react";

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

            {/* Campus Image */}
            <div>
              <div
                className="w-full aspect-video overflow-hidden hover-lift relative"
                style={{
                  backgroundColor: "var(--paper)",
                  border: "1.5px solid var(--paper-dark)",
                  borderRadius: "2rem 1.2rem 2.5rem 1rem",
                }}
              >
                <img
                  src="/Saintgits-College.jpg"
                  alt="Saintgits College of Engineering Campus"
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className="font-mono-editorial text-center mt-3 tracking-widest uppercase"
                style={{ fontSize: "0.52rem", color: "var(--ink-soft)" }}
              >
                Saintgits College of Engineering Campus
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

            {/* Interactive Google Map Embed */}
            <div
              className="w-full overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
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
                Get Opening Updates
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
