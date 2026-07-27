"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface DesktopNavbarProps {
  pathname: string;
  isActive: (href: string) => boolean;
  navLinks: { href: string; label: string }[];
  isDarkTheme: boolean;
}

export default function DesktopNavbar({ pathname, isActive, navLinks, isDarkTheme }: DesktopNavbarProps) {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-5 hidden md:flex items-center justify-between">
      {/* Logo / Wordmark */}
      <Link href="/" className="flex items-center group flex-shrink-0">
        <Image
          src={isDarkTheme ? "/logo/procomm-logo.png" : "/logo/procomm-logo-white.png"}
          alt="PROCOMM '26"
          width={220}
          height={36}
          className="object-contain transition-all duration-300 h-8 w-auto"
          priority
        />
      </Link>

      {/* Nav Links (all yellow, active has underline, improved typography) */}
      <nav className="flex items-center gap-9 relative" aria-label="Desktop navigation">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative pb-1.5 pt-1 font-mono text-[0.72rem] tracking-wider uppercase font-semibold transition-colors duration-300"
              style={{
                color: active ? "var(--ochre)" : "rgba(229, 161, 57, 0.72)",
                textShadow: isDarkTheme 
                  ? "0 0.5px 1px rgba(0, 0, 0, 0.05)" 
                  : "0 1px 3px rgba(0, 0, 0, 0.4)",
              }}
            >
              {link.label}
              {active && (
                <motion.div
                  layoutId="activeUnderlineDesktop"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-amber-500 rounded-full"
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Desktop CTA */}
      <div className="flex items-center flex-shrink-0">
        <Link
          href="/register"
          className="btn-ochre hover-lift rounded-full text-[0.62rem] tracking-widest uppercase font-semibold"
          style={{
            padding: "0.5rem 1.25rem",
            boxShadow: "0 4px 12px -2px rgba(200, 146, 58, 0.25)",
          }}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
