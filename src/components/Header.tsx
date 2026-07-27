"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import DesktopNavbar from "@/components/DesktopNavbar";
import MobileNavbar from "@/components/MobileNavbar";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/competition", label: "Problems" },
  { href: "/venue", label: "Venue" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;
  
  // Navbar is ALWAYS dark pine-teal green (#122020) with white logo & amber nav links
  const isDarkTheme = false;
  const navBg = "rgba(18, 32, 32, 0.94)";

  return (
    <>
      {/* SVG ClipPath Definition for Wavy Desktop Header Bottom Edge */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true" style={{ position: "fixed", top: -9999, left: -9999 }}>
        <defs>
          <clipPath id="desktop-nav-wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.72 C 0.88,0.86 0.74,0.68 0.58,0.80 C 0.42,0.92 0.28,0.66 0.14,0.82 C 0.07,0.88 0.03,0.74 0,0.76 Z" />
          </clipPath>
        </defs>
      </svg>

      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "max-md:translate-y-0 max-md:opacity-100 max-md:pointer-events-auto -translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* DESKTOP HEADER (md+): Single continuous glass container clipped into a wave */}
        <div
          className="hidden md:block w-full transition-colors duration-500 pb-5"
          style={{
            background: navBg,
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            clipPath: "url(#desktop-nav-wave-clip)",
            WebkitClipPath: "url(#desktop-nav-wave-clip)",
          }}
        >
          <DesktopNavbar
            pathname={pathname}
            isActive={isActive}
            navLinks={NAV_LINKS}
            isDarkTheme={isDarkTheme}
          />
        </div>

        {/* MOBILE HEADER (<md): Clean glass strip, drawer popup has organic wavy box shape */}
        <div
          className="block md:hidden w-full transition-colors duration-500"
          style={{
            background: navBg,
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <MobileNavbar
            pathname={pathname}
            isActive={isActive}
            navLinks={NAV_LINKS}
            isDarkTheme={isDarkTheme}
          />
        </div>
      </header>
    </>
  );
}
