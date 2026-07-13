"use client";

import { Facebook, Instagram, Linkedin, Twitter, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-retro-brown text-retro-cream border-t-[3px] border-retro-brown py-12 px-6 select-none mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left section: Comsoc Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="font-syne text-lg font-extrabold tracking-widest text-retro-white">
            PROCOMM &apos;26
          </h3>
          <p className="font-outfit text-xs text-retro-cream/80 max-w-sm mt-2">
            The premier Communications Project Competition organized by the IEEE ComSoc Kerala Chapter and IEEE Kerala Section. Fostering future innovations in networking and telecommunications.
          </p>
        </div>

        {/* Center section: Link & Socials */}
        <div className="flex flex-col items-center gap-4">
          <a 
            href="https://comsoc.ieeekerala.org" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 font-mono text-xs text-retro-white hover:underline tracking-widest uppercase"
          >
            <Globe className="w-4 h-4" />
            comsoc.ieeekerala.org
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a 
              href="https://facebook.com/ieeecomsocks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-retro-cream/80 hover:text-retro-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com/ieeecomsocks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-retro-cream/80 hover:text-retro-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/ieeecomsocks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-retro-cream/80 hover:text-retro-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/company/ieeecomsocks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-retro-cream/80 hover:text-retro-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right section: Copyrights */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end">
          <p className="font-mono text-[10px] text-retro-cream/60">
            &copy; {new Date().getFullYear()} IEEE ComSoc Kerala Chapter.
          </p>
          <p className="font-mono text-[10px] text-retro-cream/50 mt-1">
            All Rights Reserved.
          </p>
          <div className="mt-4 flex gap-3 text-[9px] font-bold tracking-widest text-retro-cream/70 uppercase">
            <a href="#about" className="hover:underline">About</a>
            <span>•</span>
            <a href="#tracks" className="hover:underline">Tracks</a>
            <span>•</span>
            <a href="#host" className="hover:underline">Host</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
