"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

export default function ContactForm() {
  const contacts = [
    {
      type: "contact",
      label: "Co-coordinator",
      val: "S Harijith Viswanath",
      displayPhone: "+91 79942 74376",
      phone: "+917994274376",
      whatsapp: "917994274376",
    },
    {
      type: "contact",
      label: "Co-coordinator",
      val: "Nayana Raj",
      displayPhone: "+91 90372 99063",
      phone: "+919037299063",
      whatsapp: "919037299063",
    },
  ];

  return (
    <section id="contact" className="w-full py-16 px-6 select-none" style={{ backgroundColor: "var(--ivory)" }}>
      <div className="max-w-3xl mx-auto">
        {/* Premium Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 select-text text-left">
          {contacts.map((item, idx) => (
            <motion.div 
              key={idx}
              className="p-7 flex flex-col justify-between"
              style={{
                borderRadius: "1rem",
                backgroundColor: "var(--moon)",
                border: "1px solid var(--paper-dark)",
                minHeight: "200px"
              }}
            >
              <div>
                {/* Header Row: Label */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-editorial text-[9px] uppercase tracking-widest font-semibold" style={{ color: idx % 2 === 0 ? "var(--ochre)" : "var(--moss)" }}>
                    {item.label}
                  </span>
                </div>

                {/* Card Title & Content */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink-deep italic leading-snug">
                  {item.val}
                </h3>
                <p className="font-mono-editorial text-xs mt-1.5" style={{ color: "var(--ink-mid)" }}>
                  {item.displayPhone}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="flex gap-3 items-center mt-6 pt-5 border-t border-dashed border-zinc-300/40">
                <a
                  href={`tel:${item.phone}`}
                  className="group flex-1 py-2 text-xs flex items-center justify-center gap-2 rounded-lg border border-[var(--paper-dark)] bg-[var(--ivory)] hover:bg-[var(--ink-deep)] hover:border-[var(--ink-deep)] text-[var(--ink-deep)] hover:text-[var(--ivory)] transition-all duration-300 font-medium cursor-pointer"
                >
                  <PhoneCall size={12} className="text-[var(--ochre)] group-hover:text-[var(--ivory)] transition-colors duration-300" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${item.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 py-2 text-xs flex items-center justify-center gap-2 rounded-lg border border-[var(--paper-dark)] bg-[var(--ivory)] hover:bg-[var(--ink-deep)] hover:border-[var(--ink-deep)] text-[var(--ink-deep)] hover:text-[var(--ivory)] transition-all duration-300 font-medium cursor-pointer"
                >
                  <img src="/whatsapp-icon.png" alt="WhatsApp" className="w-3.5 h-3.5 object-contain block group-hover:hidden" />
                  <img src="/whatsapp-icon-white.png" alt="WhatsApp" className="w-3.5 h-3.5 object-contain hidden group-hover:block" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
