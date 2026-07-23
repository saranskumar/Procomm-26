"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Globe, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-retro-brown text-retro-cream border-t-[3px] border-retro-brown py-12 px-6 select-none mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-retro-cream/10 pb-8">
        
        {/* Col 1: Organizer Info */}
        <div className="flex flex-col gap-4">
          <h3 className="font-syne text-lg font-extrabold tracking-widest text-retro-white">
            PROCOMM &apos;26
          </h3>
          <p className="font-outfit text-xs text-retro-cream/80 leading-relaxed">
            The flagship Communications Project Competition organized by the IEEE ComSoc Kerala Chapter and IEEE Kerala Section. Fostering next-gen technological breakthroughs in communications.
          </p>
          <div className="text-[10px] font-mono text-retro-cream/60 leading-tight">
            Host Venue:<br />
            <strong>Saintgits College of Engineering (Autonomous)</strong><br />
            Kottayam, Kerala, India
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-syne text-xs font-extrabold uppercase tracking-widest text-retro-white">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2 font-outfit text-xs text-retro-cream/80">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/competition" className="hover:underline">Competition Guidelines</Link>
            <Link href="/register" className="hover:underline">Registration Portal</Link>
          </div>
        </div>

        {/* Col 3: Contacts */}
        <div className="flex flex-col gap-3">
          <h4 className="font-syne text-xs font-extrabold uppercase tracking-widest text-retro-white">
            Inquiries
          </h4>
          <div className="flex flex-col gap-2 font-mono text-xs text-retro-cream/80">
            <a href="mailto:comsoc@ieeekerala.org" className="flex items-center gap-2 hover:underline">
              <Mail className="w-3.5 h-3.5" />
              comsoc@ieeekerala.org
            </a>
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              +91 98765 43210 (Support)
            </span>
            <span className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5" />
              <span>Saintgits College, Kottayam, Kerala - 686532</span>
            </span>
          </div>
        </div>

        {/* Col 4: IEEE / ComSoc Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-syne text-xs font-extrabold uppercase tracking-widest text-retro-white">
            IEEE Organizations
          </h4>
          <div className="flex flex-col gap-2 font-outfit text-xs text-retro-cream/80">
            <a href="https://ieee.org" target="_blank" rel="noopener noreferrer" className="hover:underline">IEEE Global Website</a>
            <a href="https://comsoc.org" target="_blank" rel="noopener noreferrer" className="hover:underline">IEEE Communications Society</a>
            <a href="https://ieeekerala.org" target="_blank" rel="noopener noreferrer" className="hover:underline">IEEE Kerala Section</a>
            <a href="https://comsoc.ieeekerala.org" target="_blank" rel="noopener noreferrer" className="hover:underline">IEEE ComSoc Kerala Chapter</a>
          </div>
        </div>

      </div>

      {/* Bottom Area */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Social media links */}
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
          <a 
            href="https://comsoc.ieeekerala.org" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-retro-cream/80 hover:text-retro-white transition-colors"
            aria-label="Website"
          >
            <Globe className="w-5 h-5" />
          </a>
        </div>

        {/* Copyrights & Policies */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end font-mono text-[10px] text-retro-cream/60">
          <p>
            &copy; {new Date().getFullYear()} IEEE ComSoc Kerala Chapter. All Rights Reserved.
          </p>
          <div className="mt-2 flex gap-3 text-[9px] font-bold tracking-widest text-retro-cream/70 uppercase">
            <Link href="/register" className="hover:underline">Register</Link>
            <span>•</span>
            <Link href="/about" className="hover:underline">About</Link>
            <span>•</span>
            <a href="https://ieee.org/security-privacy.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="https://ieee.org/about/corporate/governance/p9-26.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Nondiscrimination Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
