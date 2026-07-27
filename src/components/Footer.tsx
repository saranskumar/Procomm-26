"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Globe, Mail, Phone, MapPin } from "lucide-react";

// ── Topographic background for footer ───────────────────────────────────────
const TOPO_PATHS = [
  "M-100,180 C200,120 500,175 800,145 C1100,115 1300,170 1540,150",
  "M-100,200 C200,148 500,195 800,168 C1100,140 1300,188 1540,172",
  "M-100,218 C200,168 500,210 800,188 C1100,160 1300,203 1540,190",
  "M-100,232 C200,185 500,224 800,206 C1100,180 1300,215 1540,205",
];

interface FooterProps {
  fromColor?: string;
}

export default function Footer({ fromColor = "var(--ivory)" }: FooterProps) {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--ink-deep)" }}
    >
      {/* ── Hill divider (top) ── */}
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ marginTop: "-1px" }}
      >
        <path
          d="M0,0 L0,40 C200,70 400,20 600,50 C800,80 1000,30 1200,58 C1350,75 1420,40 1440,48 L1440,0 Z"
          fill={fromColor}
          opacity="1"
        />
      </svg>

      {/* ── Topographic line background ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        {TOPO_PATHS.map((d, i) => (
          <path key={i} d={d} stroke="var(--star-glow)" strokeWidth="0.5" opacity={0.04 - i * 0.005} />
        ))}
      </svg>

      {/* ── Star scatter ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {Array.from({ length: 25 }, (_, i) => ({
          x: ((i * 173.5) % 100),
          y: ((i * 101.3) % 100),
          r: 0.1 + (i % 3) * 0.08,
          delay: (i % 6) * 0.5,
        })).map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="var(--star-glow)"
            className={`star-shimmer shimmer-d${(i % 6) + 1}`}
            style={{ opacity: 0.35 }}
          />
        ))}
      </svg>

      {/* ── Content ── */}
      <div className="relative z-10 pt-24 pb-0">

        {/* Large editorial wordmark */}
        <div className="max-w-7xl mx-auto px-8 pb-12 border-b" style={{ borderColor: "rgba(245,240,232,0.07)" }}>
          <div
            className="font-display font-bold select-none pointer-events-none"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontStyle: "italic",
              lineHeight: 0.9,
              color: "rgba(245,240,232,0.06)",
              letterSpacing: "-0.02em",
            }}
            aria-hidden="true"
          >
            PROCOMM
            <br />
            <span style={{ color: "rgba(200,146,58,0.08)" }}>&apos;26</span>
          </div>
        </div>

        {/* Main footer grid */}
        <div
          className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 border-b"
          style={{ borderColor: "rgba(245,240,232,0.07)" }}
        >

          {/* Col 1 — About */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/procomm-logo-white.png"
                alt="PROCOMM '26"
                width={200}
                height={32}
                className="object-contain h-7 w-auto opacity-95"
              />
            </div>

            <p
              className="font-body"
              style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.75 }}
            >
              The flagship Communications Project Competition organized by the IEEE ComSoc Kerala Chapter. Fostering next-gen innovation in communications engineering.
            </p>

            <div
              className="font-mono-editorial"
              style={{ fontSize: "0.6rem", color: "rgba(245,240,232,0.3)", lineHeight: 1.6 }}
            >
              Host Venue:<br />
              <strong style={{ color: "rgba(245,240,232,0.5)" }}>Saintgits College of Engineering (Autonomous)</strong><br />
              Kottayam, Kerala, India
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h4
              className="font-mono-editorial tracking-widest uppercase"
              style={{ fontSize: "0.58rem", color: "var(--ochre)", opacity: 0.85 }}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5" aria-label="Footer navigation">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/competition", label: "Problem Statements" },
                { href: "/venue", label: "Venue" },
                { href: "/register", label: "Registration Portal" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body transition-colors"
                  style={{
                    fontSize: "0.82rem",
                    color: "rgba(245,240,232,0.45)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.85)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Inquiries */}
          <div className="flex flex-col gap-4">
            <h4
              className="font-mono-editorial tracking-widest uppercase"
              style={{ fontSize: "0.58rem", color: "var(--ochre)", opacity: 0.85 }}
            >
              Inquiries &amp; Contact
            </h4>
            <div
              className="flex flex-col gap-3 font-mono-editorial select-text"
              style={{ fontSize: "0.72rem" }}
            >
              <div className="text-[0.65rem] uppercase tracking-wider text-amber-500 font-bold mb-1">
                For further queries, contact:
              </div>
              <span
                className="flex items-start gap-2.5 font-semibold"
                style={{ color: "rgba(245,240,232,0.85)" }}
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0 mt-px text-amber-500" />
                S Harijith Viswanath:<br />+91 7994274376
              </span>
            </div>
          </div>

          {/* Col 4 — IEEE Organizations */}
          <div className="flex flex-col gap-4">
            <h4
              className="font-mono-editorial tracking-widest uppercase"
              style={{ fontSize: "0.58rem", color: "var(--ochre)", opacity: 0.85 }}
            >
              IEEE Organizations
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "https://ieee.org", label: "IEEE Global Website" },
                { href: "https://comsoc.org", label: "IEEE Communications Society" },
                { href: "https://ieeekerala.org", label: "IEEE Kerala Section" },
                { href: "https://comsoc.ieeekerala.org", label: "IEEE ComSoc Kerala Chapter" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body transition-colors"
                  style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.85)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Social icons */}
          <div className="flex items-center gap-5">
            {[
              { icon: Facebook, href: "https://facebook.com/ieeecomsocks", label: "Facebook" },
              { icon: Instagram, href: "https://instagram.com/ieeecomsocks", label: "Instagram" },
              { icon: Twitter, href: "https://twitter.com/ieeecomsocks", label: "Twitter" },
              { icon: Linkedin, href: "https://linkedin.com/company/ieeecomsocks", label: "LinkedIn" },
              { icon: Globe, href: "https://comsoc.ieeekerala.org", label: "Website" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-all"
                style={{ color: "rgba(245,240,232,0.3)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200,146,58,0.85)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div
            className="font-mono-editorial text-center md:text-right"
            style={{ fontSize: "0.58rem", color: "rgba(245,240,232,0.2)" }}
          >
            <p>&copy; {new Date().getFullYear()} IEEE ComSoc Kerala Chapter. All Rights Reserved.</p>
            <div className="flex gap-3 mt-1 justify-center md:justify-end flex-wrap">
              {[
                { label: "Register", href: "/register" },
                { label: "About", href: "/about" },
                {
                  label: "Privacy Policy",
                  href: "https://ieee.org/security-privacy.html",
                  external: true,
                },
                {
                  label: "Nondiscrimination",
                  href: "https://ieee.org/about/corporate/governance/p9-26.html",
                  external: true,
                },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-3">
                  {i > 0 && <span style={{ color: "rgba(245,240,232,0.1)" }}>·</span>}
                  <Link
                    href={item.href}
                    className="uppercase tracking-widest transition-colors"
                    style={{ color: "rgba(245,240,232,0.2)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.55)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.2)")}
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Breathing space at very bottom */}
        <div style={{ height: "24px", backgroundColor: "var(--ink-deep)" }} />
      </div>
    </footer>
  );
}
