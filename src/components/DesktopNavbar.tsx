"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/problem", label: "Problems" },
  { href: "/contact", label: "Contact" },
];

export default function DesktopNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;
  const isDarkTheme = false; // Always dark theme (#121422 - matches var(--ink-deep))
  const navBg = "rgba(18, 20, 34, 0.94)";
  const shouldShow = pathname !== "/" || scrolled;

  return (
    <>
      {/* SVG ClipPath Definition for Desktop Wavy Bottom Edge */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true" style={{ position: "fixed", top: -9999, left: -9999 }}>
        <defs>
          <clipPath id="desktop-nav-wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.68 C 0.90,0.94 0.78,0.50 0.66,0.78 C 0.54,0.98 0.44,0.54 0.32,0.86 C 0.20,1.00 0.10,0.58 0,0.76 Z" />
          </clipPath>
        </defs>
      </svg>

      <header
        className={`hidden md:block fixed top-0 left-0 right-0 z-40 w-full select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shouldShow
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="w-full transition-colors duration-500 pb-7 relative"
          style={{
            background: navBg,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            clipPath: "url(#desktop-nav-wave-clip)",
            WebkitClipPath: "url(#desktop-nav-wave-clip)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="max-w-7xl mx-auto w-full px-6 py-3.5 flex items-center justify-between">
            {/* Logo / Wordmark */}
            <Link href="/" className="flex items-center group flex-shrink-0 transition-transform duration-300 hover:scale-105">
              <Image
                src={isDarkTheme ? "/logo/procomm-logo.png" : "/logo/procomm-logo-white.png"}
                alt="PROCOMM '26"
                width={220}
                height={36}
                className="object-contain transition-all duration-300 h-8 w-auto"
                priority
              />
            </Link>

            {/* Nav Links — Clean Inline Links */}
            <nav 
              className="flex items-center gap-8" 
              aria-label="Desktop navigation"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative py-1 font-mono text-[0.78rem] tracking-wider uppercase font-semibold transition-colors duration-300 select-none flex items-center justify-center"
                    style={{
                      color: active ? "var(--ochre)" : "rgba(250, 247, 230, 0.75)",
                    }}
                  >
                    <span className="relative z-10 transition-colors hover:text-ochre">{link.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeNavLineDesktop"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                        style={{ backgroundColor: "var(--ochre)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Button */}
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/register"
                className="btn-ochre hover-lift rounded-full text-[0.68rem] tracking-widest uppercase font-semibold transition-all duration-300"
                style={{
                  padding: "0.6rem 1.5rem",
                  boxShadow: "0 4px 16px -2px rgba(200, 146, 58, 0.35)",
                  borderRadius: "9999px"
                }}
              >
                Opening Soon
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
