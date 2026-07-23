"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-retro-cream border-b-[3px] border-retro-brown shadow-sm select-none">
      {/* Top Branding Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-retro-brown/10">
        
        {/* IEEE ComSoc Kerala Chapter Logo */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-[10px] md:text-[11px] leading-tight font-extrabold uppercase tracking-wider text-retro-brown border-r border-retro-brown/20 pr-3">
            <span className="font-syne text-[11px] md:text-[12px] tracking-normal font-extrabold">IEEE ComSoc</span>
            <span className="text-retro-brown/85 font-outfit font-medium">Kerala Chapter</span>
          </div>
        </div>

        {/* IEEE Kerala Section Badge */}
        <div className="border border-retro-brown px-3 py-0.5 rounded text-[9px] md:text-[10px] font-bold tracking-widest text-retro-brown flex items-center bg-retro-white">
          <span className="mr-1">IEEE</span>
          <span className="bg-retro-brown text-retro-cream px-1 py-px rounded-sm mr-1 font-extrabold text-[8px]">KERALA</span>
          <span>SECTION</span>
        </div>

        {/* IEEE Global Logo representation */}
        <div className="flex items-center gap-1">
          <svg className="w-6 h-6 text-retro-brown fill-current" viewBox="0 0 24 24">
            <path d="M12 2L4 12h5v8h6v-8h5L12 2z M9 14h6v2H9v-2z" />
          </svg>
          <span className="font-syne text-sm md:text-base font-extrabold tracking-tighter text-retro-brown">IEEE</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-syne text-base md:text-lg font-extrabold tracking-widest text-retro-brown">
          PROCOMM &apos;26
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          <Link 
            href="/" 
            className={`font-outfit text-xs md:text-sm font-semibold tracking-wider uppercase transition-all hover:underline ${
              isActive("/") ? "text-retro-brown underline decoration-[2px] underline-offset-4 font-bold" : "text-retro-brown/80"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`font-outfit text-xs md:text-sm font-semibold tracking-wider uppercase transition-all hover:underline ${
              isActive("/about") ? "text-retro-brown underline decoration-[2px] underline-offset-4 font-bold" : "text-retro-brown/80"
            }`}
          >
            About
          </Link>
          <Link 
            href="/competition" 
            className={`font-outfit text-xs md:text-sm font-semibold tracking-wider uppercase transition-all hover:underline ${
              isActive("/competition") ? "text-retro-brown underline decoration-[2px] underline-offset-4 font-bold" : "text-retro-brown/80"
            }`}
          >
            Competition
          </Link>
          <Link 
            href="/register" 
            className={`font-outfit text-xs md:text-sm font-semibold tracking-wider uppercase transition-all hover:underline ${
              isActive("/register") ? "text-retro-brown underline decoration-[2px] underline-offset-4 font-bold" : "text-retro-brown/80"
            }`}
          >
            Register
          </Link>
          
          <Link 
            href="/register" 
            className="hidden md:inline-block px-4 py-1.5 bg-retro-brown text-retro-cream font-syne text-[11px] font-extrabold tracking-widest rounded-full uppercase retro-button-shadow"
          >
            Register Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
