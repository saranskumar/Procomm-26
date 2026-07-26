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
  const [darkText, setDarkText] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show header only after scrolling past 60px
      setScrolled(window.scrollY > 60);
      // Switch logo/trigger to dark when floating over light background sections (past 580px)
      setDarkText(window.scrollY > 580);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;
  const isHome = pathname === "/";
  
  // Determine dark vs light contrast for logo and mobile triggers
  const isDarkTheme = !isHome || darkText;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "max-md:translate-y-0 max-md:opacity-100 max-md:pointer-events-auto -translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <DesktopNavbar
        pathname={pathname}
        isActive={isActive}
        navLinks={NAV_LINKS}
        isDarkTheme={isDarkTheme}
      />
      <MobileNavbar
        pathname={pathname}
        isActive={isActive}
        navLinks={NAV_LINKS}
        isDarkTheme={isDarkTheme}
      />
    </header>
  );
}
