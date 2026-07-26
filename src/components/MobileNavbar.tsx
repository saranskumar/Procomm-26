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
          src="/logo/procomm-logo.png"
          alt="PROCOMM '26"
          width={112}
          height={28}
          className="object-contain opacity-95 transition-all duration-300"
          style={{
            filter: isDarkTheme ? "brightness(0)" : "none",
            maxHeight: 25,
            width: "auto",
          }}
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-4 top-20 z-30 flex flex-col p-6 rounded-3xl border backdrop-blur-2xl shadow-paper-lg bg-[#122022]/95 border-white/10"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-mono text-lg font-semibold block py-2 px-2 rounded-xl text-white transition-all duration-300 relative"
                    style={{
                      color: active ? "var(--ochre)" : "rgba(229, 161, 57, 0.72)",
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeUnderlineMobile"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-amber-500 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </Link>
                );
              })}
              <div className="pt-4 border-t mt-2 border-white/10">
                <Link href="/register" className="btn-ochre w-full text-center py-3 rounded-full flex justify-center text-xs font-semibold tracking-wider uppercase">
                  Register Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
