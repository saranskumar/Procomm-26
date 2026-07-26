"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/competition", label: "Problems" },
  { href: "/venue", label: "Venue" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [darkText, setDarkText] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show header only after scrolling past 60px
      setScrolled(window.scrollY > 60);
      // Switch to dark text when floating over light background sections (past 580px)
      setDarkText(window.scrollY > 580);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const isHome = pathname === "/";
  
  // Show header only while scrolling
  const showNavbar = scrolled;
  
  // Determine dark vs light text contrast
  const isDarkTheme = !isHome || darkText;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 w-full select-none"
        style={{
          transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
          opacity: showNavbar ? 1 : 0,
          pointerEvents: showNavbar ? "auto" : "none",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
        }}
      >
        {/* Transparent floating wrapper aligned with page grid */}
        <div className="max-w-7xl mx-auto w-full px-6 py-5 flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src="/logo/procomm-logo.png"
              alt="PROCOMM '26"
              width={112}
              height={28}
              className="object-contain opacity-92 transition-all duration-300"
              style={{
                filter: isDarkTheme ? "brightness(0)" : "none",
                maxHeight: 25,
                width: "auto",
              }}
              priority
            />
          </Link>

          {/* Desktop Nav Links (pure floating text) */}
          <nav className="hidden md:flex items-center gap-8 relative" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-1 font-mono-editorial text-[0.62rem] tracking-widest uppercase font-medium transition-colors duration-300"
                  style={{
                    color: active
                      ? "var(--ochre)"
                      : isDarkTheme
                        ? "var(--ink-deep)"
                        : "var(--ivory)",
                  }}
                >
                  {link.label}
                  {/* Subtle underline for active item */}
                  {active && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute left-0 right-0 bottom-0 h-[1px] bg-amber-500"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link
              href="/register"
              className="btn-ochre hover-lift rounded-full text-[0.6rem] tracking-widest uppercase font-semibold"
              style={{
                padding: "0.45rem 1.1rem",
                boxShadow: "0 4px 12px -2px rgba(200, 146, 58, 0.25)",
              }}
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center flex-shrink-0">
            <button
              className="flex flex-col gap-[5px] p-2 cursor-pointer"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block w-5.5 h-[1.5px] rounded-full origin-center"
                style={{ backgroundColor: isDarkTheme ? "var(--ink-deep)" : "var(--ivory)" }}
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block w-5.5 h-[1.5px] rounded-full"
                style={{ backgroundColor: isDarkTheme ? "var(--ink-deep)" : "var(--ivory)" }}
                animate={menuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5.5 h-[1.5px] rounded-full origin-center"
                style={{ backgroundColor: isDarkTheme ? "var(--ink-deep)" : "var(--ivory)" }}
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-4 top-20 z-30 md:hidden flex flex-col p-6 rounded-3xl border backdrop-blur-2xl shadow-paper-lg bg-[#122022]/95 border-white/10"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display font-bold block text-xl py-1 px-2 rounded-xl text-white transition-all duration-300"
                  style={{
                    color: isActive(link.href) ? "var(--ochre)" : "var(--ivory)",
                    fontStyle: "italic",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t mt-2 border-white/10">
                <Link href="/register" className="btn-ochre w-full text-center py-3 rounded-full flex justify-center text-xs font-semibold tracking-wider uppercase">
                  Register Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
