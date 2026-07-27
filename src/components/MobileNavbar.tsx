"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavbarProps {
  pathname: string;
  isActive: (href: string) => boolean;
  navLinks: { href: string; label: string }[];
  isDarkTheme: boolean;
}

export default function MobileNavbar({ pathname, isActive, navLinks, isDarkTheme }: MobileNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-5 flex md:hidden items-center justify-between">
      {/* Logo / Wordmark */}
      <Link href="/" className="flex items-center group flex-shrink-0">
        <Image
          src={isDarkTheme ? "/logo/procomm-logo.png" : "/logo/procomm-logo-white.png"}
          alt="PROCOMM '26"
          width={180}
          height={30}
          className="object-contain transition-all duration-300 h-6.5 w-auto"
          priority
        />
      </Link>

      {/* Mobile Menu Trigger */}
      <div className="flex items-center flex-shrink-0">
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

      {/* Mobile Menu Drawer — organic wavy-edged box */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-20 z-30"
            style={{
              borderRadius: "28% 12% 24% 10% / 10% 22% 8% 28%",
              overflow: "hidden",
            }}
          >
            {/* Inner glass content */}
            <div
              style={{
                background: "rgba(18, 32, 32, 0.96)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "inherit",
                padding: "1.75rem 1.5rem",
              }}
            >
              {/* Decorative wave at top of drawer */}
              <div aria-hidden="true" style={{ marginBottom: "0.75rem", marginTop: "-0.5rem" }}>
                <svg viewBox="0 0 300 12" style={{ width: "100%", height: 12 }} preserveAspectRatio="none">
                  <motion.path
                    d="M0,6 C40,10 80,2 120,6 C160,10 200,2 240,6 C270,9 290,4 300,6"
                    fill="none"
                    stroke="rgba(229,161,57,0.18)"
                    strokeWidth="1.5"
                    animate={{
                      d: [
                        "M0,6 C40,10 80,2 120,6 C160,10 200,2 240,6 C270,9 290,4 300,6",
                        "M0,4 C40,2 80,10 120,5 C160,2 200,10 240,4 C270,2 290,8 300,4",
                        "M0,6 C40,10 80,2 120,6 C160,10 200,2 240,6 C270,9 290,4 300,6",
                      ],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-mono text-lg font-semibold block py-2.5 px-3 transition-all duration-300 relative"
                      style={{
                        color: active ? "var(--ochre)" : "rgba(229, 161, 57, 0.65)",
                        borderRadius: "12px 6px 10px 4px",
                        background: active ? "rgba(229,161,57,0.06)" : "transparent",
                      }}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {active && (
                        <motion.div
                          layoutId="activeUnderlineMobile"
                          className="absolute bottom-1 left-3 right-3 h-[1.5px] rounded-full"
                          style={{ background: "var(--ochre)", opacity: 0.6 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </Link>
                  );
                })}

                {/* Decorative wave divider */}
                <div aria-hidden="true" style={{ margin: "0.5rem 0" }}>
                  <svg viewBox="0 0 300 8" style={{ width: "100%", height: 8 }} preserveAspectRatio="none">
                    <motion.path
                      d="M0,4 C60,8 120,0 180,4 C240,8 280,1 300,4"
                      fill="none"
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="1"
                      animate={{
                        d: [
                          "M0,4 C60,8 120,0 180,4 C240,8 280,1 300,4",
                          "M0,3 C60,0 120,7 180,3 C240,0 280,6 300,3",
                          "M0,4 C60,8 120,0 180,4 C240,8 280,1 300,4",
                        ],
                      }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </svg>
                </div>

                <Link
                  href="/register"
                  className="btn-ochre w-full text-center py-3 flex justify-center text-xs font-semibold tracking-wider uppercase mt-1"
                  style={{ borderRadius: "16px 8px 14px 6px" }}
                >
                  Register Now
                </Link>
              </nav>

              {/* Decorative wave at bottom */}
              <div aria-hidden="true" style={{ marginTop: "0.75rem", marginBottom: "-0.5rem" }}>
                <svg viewBox="0 0 300 12" style={{ width: "100%", height: 12 }} preserveAspectRatio="none">
                  <motion.path
                    d="M0,6 C50,2 100,10 150,6 C200,2 250,10 300,6"
                    fill="none"
                    stroke="rgba(229,161,57,0.12)"
                    strokeWidth="1.5"
                    animate={{
                      d: [
                        "M0,6 C50,2 100,10 150,6 C200,2 250,10 300,6",
                        "M0,4 C50,8 100,2 150,5 C200,8 250,2 300,4",
                        "M0,6 C50,2 100,10 150,6 C200,2 250,10 300,6",
                      ],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
