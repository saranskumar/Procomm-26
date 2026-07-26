"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/competition", label: "Problem Statements" },
  { href: "/venue", label: "Venue" },
  { href: "/register", label: "Register" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className="fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-7xl rounded-2xl backdrop-blur-lg"
        style={{
          top: scrolled ? "0.6rem" : "1.2rem",
          padding: scrolled ? "0.55rem 1.5rem" : "0.9rem 2rem",
          backgroundColor: scrolled
            ? "rgba(250, 247, 230, 0.85)"
            : "rgba(11, 26, 48, 0.22)",
          borderColor: scrolled
            ? "rgba(11, 26, 48, 0.08)"
            : "rgba(250, 247, 230, 0.12)",
          borderWidth: "1px",
          boxShadow: scrolled
            ? "0 8px 32px 0 rgba(11, 26, 48, 0.06)"
            : "inset 0 1px 0 0 rgba(250, 247, 230, 0.08)",
        }}
      >
        <div className="w-full flex items-center justify-between">

          {/* ── Wordmark / Logo ── */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* PROCOMM brand logo */}
            <Image
              src="/logo/procomm-logo.png"
              alt="PROCOMM '26"
              width={140}
              height={40}
              className="flex-shrink-0 object-contain transition-all duration-300"
              style={{
                filter: scrolled
                  ? "brightness(0)"          /* dark navy on cream bg */
                  : "none",                  /* white on dark bg */
                opacity: scrolled ? 0.85 : 0.92,
                maxHeight: 36,
                width: "auto",
              }}
              priority
            />
          </Link>
 
          {/* ── Desktop Navigation ── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  scrolled ? "nav-link" : "nav-link-light"
                } ${isActive(link.href) ? "active" : ""}`}
                style={{ transition: "color 0.4s ease" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
 
          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/register" className="btn-ochre" style={{ padding: "0.52rem 1.2rem", fontSize: "0.68rem" }}>
              Register Now
            </Link>
          </div>
 
          {/* ── Mobile Menu Toggle ── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-6 h-[1.5px] rounded-full origin-center"
              style={{ backgroundColor: scrolled ? "var(--ink-deep)" : "var(--ivory)" }}
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] rounded-full"
              style={{ backgroundColor: scrolled ? "var(--ink-deep)" : "var(--ivory)" }}
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] rounded-full origin-center"
              style={{ backgroundColor: scrolled ? "var(--ink-deep)" : "var(--ivory)" }}
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-30 md:hidden flex flex-col pt-24 px-8 pb-10 paper-bg"
            style={{ backgroundColor: "var(--ivory)" }}
          >
            {/* Decorative moon */}
            <svg
              className="absolute top-8 right-8 opacity-15 pointer-events-none"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 40 8 A 32 32 0 1 1 40 72 A 20 20 0 1 0 40 8"
                fill="var(--ochre)"
              />
            </svg>

            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    className="font-display font-bold block transition-opacity hover:opacity-60"
                    style={{
                      fontSize: "clamp(2rem, 8vw, 3rem)",
                      fontStyle: "italic",
                      color: isActive(link.href) ? "var(--ochre)" : "var(--ink-deep)",
                      lineHeight: 1.1,
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t" style={{ borderColor: "var(--paper-dark)" }}>
              <Link href="/register" className="btn-primary w-full text-center" style={{ justifyContent: "center" }}>
                Register Now
              </Link>
              <p
                className="font-mono-editorial text-center mt-4 tracking-widest uppercase"
                style={{ fontSize: "0.6rem", color: "var(--ink-soft)" }}
              >
                IEEE ComSoc Kerala Chapter · comsoc.ieeekerala.org
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
