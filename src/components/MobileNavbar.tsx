"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/problem", label: "Problems" },
  { href: "/contact", label: "Contact" },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const shouldShow = pathname !== "/" || scrolled;

  return (
    <>
      <header
        className={`block md:hidden fixed top-0 left-0 right-0 z-40 w-full select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shouldShow
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Top bar — 100% transparent on phone */}
        <div className="w-full bg-transparent">
          <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">
            {/* Logo / Wordmark */}
            <Link href="/" className="flex items-center group flex-shrink-0 relative z-50">
              <Image
                src="/logo/procomm-logo-white.png"
                alt="PROCOMM '26"
                width={180}
                height={30}
                className="object-contain transition-all duration-300 h-6.5 w-auto"
                priority
              />
            </Link>

            {/* Mobile Menu Trigger — Transforms 3 lines into an "X" */}
            <div className="flex items-center flex-shrink-0 relative z-50">
              <button
                className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 p-2 cursor-pointer focus:outline-none"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <motion.span
                  className="block w-6 h-[2px] rounded-full"
                  style={{ backgroundColor: "var(--ivory)" }}
                  animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block w-6 h-[2px] rounded-full"
                  style={{ backgroundColor: "var(--ivory)" }}
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-6 h-[2px] rounded-full"
                  style={{ backgroundColor: "var(--ivory)" }}
                  animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer & Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Floating Mobile Navbar Box — Grows smoothly from CENTER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: -10 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              style={{ transformOrigin: "center center" }}
              className="fixed inset-x-4 top-5 z-50 md:hidden rounded-3xl border border-white/15 bg-[#121422]/95 backdrop-blur-2xl shadow-2xl overflow-hidden p-6"
            >
              {/* Expanded Header Inside Floating Box */}
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/10">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <Image
                    src="/logo/procomm-logo-white.png"
                    alt="PROCOMM '26"
                    width={160}
                    height={26}
                    className="object-contain h-6 w-auto"
                  />
                </Link>
                
                {/* X Close Button in Expanded Form */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-ivory" />
                </button>
              </div>

              {/* Clean Nav Links List */}
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-mono text-base font-semibold block py-3 px-4 rounded-xl transition-all duration-200"
                      style={{
                        color: active ? "var(--ochre)" : "rgba(250, 247, 230, 0.85)",
                        backgroundColor: active ? "rgba(229, 161, 57, 0.12)" : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Register CTA Button */}
                <div className="pt-4 mt-2 border-t border-white/10">
                  <Link
                    href="/problem"
                    onClick={() => setMenuOpen(false)}
                    className="btn-ochre w-full text-center py-3.5 rounded-xl flex justify-center text-xs font-semibold tracking-wider uppercase shadow-lg"
                  >
                    Problem Statements
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
