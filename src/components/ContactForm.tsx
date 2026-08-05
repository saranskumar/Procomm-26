"use client";

import { Phone, MapPin } from "lucide-react";

export default function ContactForm() {
  return (
    <section id="contact" className="w-full py-20 px-6 select-none" style={{ backgroundColor: "var(--ivory)" }}>
      <div className="max-w-xl mx-auto flex flex-col gap-8 items-center text-center">
        <div className="select-text">
          <span className="chapter-label">Queries</span>
          <h2 className="editorial-headline mt-3">
            Get in Touch
          </h2>
          <p className="font-body text-xs sm:text-sm mt-3 leading-relaxed" style={{ color: "var(--ink-mid)" }}>
            Have questions about student participation, track criteria, or want to explore partner/sponsorship opportunities?
          </p>
        </div>

        <div className="flex flex-col gap-4 select-text text-left w-full">
          {[
            { icon: Phone, label: "For further queries, contact", val: "S Harijith Viswanath: +91 7994274376" },
            { icon: Phone, label: "For further queries, contact", val: "Nayana Raj: +91 90372 99063" },
            { icon: MapPin, label: "Host venue", val: "Saintgits College of Engineering (Autonomous), Kottayam, Kerala" },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="organic-card hover-lift flex gap-4 items-center p-4"
              style={{
                borderRadius: `${1.2 + (idx % 3) * 0.3}rem ${0.8 + (idx % 2) * 0.4}rem ${1.5 - (idx % 3) * 0.2}rem ${1 + (idx % 2) * 0.3}rem`,
                backgroundColor: "var(--moon)",
                border: "1.5px solid var(--paper-dark)"
              }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--ivory)", border: "1.5px solid var(--paper-dark)" }}>
                <item.icon className="w-4 h-4" style={{ color: "var(--ochre)" }} />
              </div>
              <div>
                <span className="font-mono-editorial text-[9px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>{item.label}</span>
                <p className="font-display font-bold text-sm" style={{ fontStyle: "italic", color: "var(--ink-deep)" }}>{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
