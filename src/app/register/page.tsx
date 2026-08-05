"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterBanner from "@/components/RegisterBanner";
import WaveDivider from "@/components/WaveDivider";
import IllustrationLayer from "@/components/IllustrationLayer";
import { motion } from "framer-motion";
import { 
  Calendar, FileText, ChevronRight, Laptop, UserCheck, Shield 
} from "lucide-react";

export default function RegisterPage() {
  const steps = [
    { title: "Form Submission", desc: "Fill out your student details and official contacts." },
    { title: "Jury Screening", desc: "The expert panel evaluates team details and projects." },
    { title: "24-Hour Hack", desc: "Compete in the flagship 24-hour design and code sprint." },
    { title: "Grand Finale", desc: "Present final working prototypes physically at Saintgits." },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <Header />
      <main className="flex-grow">
        
        {/* Banner Section */}
        <RegisterBanner />

        {/* 1. Registration Process Stepper */}
        <section className="py-20 px-6 select-text" style={{ backgroundColor: "var(--ivory)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="chapter-label">Roadmap</span>
              <h2 className="editorial-headline mt-3">
                Registration Process
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 select-text">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  className="organic-card hover-lift flex flex-col justify-between"
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    borderRadius: `${1.5 + (idx % 3) * 0.4}rem ${1 + (idx % 2) * 0.5}rem ${2 - (idx % 4) * 0.2}rem ${0.8 + (idx % 3) * 0.4}rem`
                  }}
                >
                  <div>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center font-mono-editorial text-xs font-bold mb-4" style={{ backgroundColor: "var(--moon)", border: "1.5px solid var(--paper-dark)", color: "var(--ochre)" }}>
                      {idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base" style={{ fontStyle: "italic", color: "var(--ink-deep)" }}>{step.title}</h3>
                    <p className="font-body text-xs mt-1.5 leading-relaxed" style={{ color: "var(--ink-mid)" }}>{step.desc}</p>
                  </div>
                  
                  {idx < 3 && (
                    <ChevronRight className="hidden sm:block absolute right-[-15px] top-[40%] w-6 h-6 text-retro-brown/40 z-10" style={{ color: "var(--paper-dark)" }} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave Divider */}
        <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

        {/* Form & Sidebar Grid */}
        <section className="py-20 px-6" style={{ backgroundColor: "var(--paper)" }}>
          <IllustrationLayer scene="brushwork" color="var(--ink-soft)" opacity={0.1} />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            
            {/* Registration Coming Soon Status (Left side) */}
            <div 
              className="lg:col-span-8 organic-card hover-lift p-6 sm:p-12 relative select-text flex flex-col justify-center items-center text-center min-h-[350px]"
              style={{
                borderRadius: "2.5rem 1.8rem 2.2rem 1.5rem",
                backgroundColor: "var(--moon)",
                border: "1.5px solid var(--paper-dark)"
              }}
            >
              
              <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--paper-dark)" }} />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--paper-dark)" }} />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--paper-dark)" }} />
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--paper-dark)" }} />

              <div className="flex flex-col items-center gap-4 max-w-lg select-text">
                <span className="font-mono-editorial text-xs font-bold uppercase tracking-wider text-amber-600 px-3 py-1 bg-amber-500/10 rounded-full select-none">
                  Portal Status
                </span>
                <h3 className="font-display font-bold text-3xl md:text-4xl mt-2 text-ink-deep italic">
                  Coming Soon
                </h3>
                <div className="w-12 h-[2px] bg-ochre my-2 select-none" />
                <p className="font-body text-sm text-ink-mid leading-relaxed">
                  We are finalizing the guidelines and portal setup. Online registrations for PROCOMM &apos;26 will open shortly. Please check back soon or consult the rulebook to prepare your project submission.
                </p>
              </div>
            </div>

            {/* Sidebar (Right side) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Important Dates */}
              <div 
                className="organic-card hover-lift p-6"
                style={{
                  borderRadius: "1.8rem 1.2rem 1.5rem 1rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <Calendar className="w-4 h-4" style={{ color: "var(--ochre)" }} />
                  Important Dates
                </h3>
                <div className="flex flex-col gap-3 font-body text-xs select-text" style={{ color: "var(--ink-mid)" }}>
                  <div className="flex justify-between border-b pb-1" style={{ borderColor: "rgba(11,26,48,0.06)" }}>
                    <span className="font-semibold">Reg Closes:</span>
                    <span className="font-mono-editorial font-bold">Aug 25, 2026</span>
                  </div>
                  <div className="flex justify-between border-b pb-1" style={{ borderColor: "rgba(11,26,48,0.06)" }}>
                    <span className="font-semibold">Abstract Review:</span>
                    <span className="font-mono-editorial font-bold">Aug 28, 2026</span>
                  </div>
                  <div className="flex justify-between border-b pb-1" style={{ borderColor: "rgba(11,26,48,0.06)" }}>
                    <span className="font-semibold">Jury Presentations:</span>
                    <span className="font-mono-editorial font-bold">Sept 5-6, 2026</span>
                  </div>
                </div>
              </div>

              {/* Required Documents */}
              <div 
                className="organic-card hover-lift p-6 select-text"
                style={{
                  borderRadius: "1.2rem 1.8rem 1rem 1.5rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <FileText className="w-4 h-4" style={{ color: "var(--moss)" }} />
                  Required Files
                </h3>
                <ul className="list-disc pl-4 font-body text-xs leading-relaxed flex flex-col gap-2" style={{ color: "var(--ink-mid)" }}>
                  <li>Valid Student ID card scans of all members.</li>
                  <li>IEEE/ComSoc membership card PDF (if applicable, for verification).</li>
                  <li>2-page project proposal in standard format.</li>
                </ul>
              </div>

              {/* Portal Info */}
              <div 
                className="organic-card hover-lift p-6 select-text"
                style={{
                  borderRadius: "1.5rem 1rem 1.8rem 1.2rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <Laptop className="w-4 h-4" style={{ color: "var(--teal-soft)" }} />
                  Submission Portal
                </h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                  Upon registration, leaders will receive dashboard credentials to track evaluation reports, feedback channels, and final presentation scheduling.
                </p>
              </div>

              {/* Contact Support */}
              <div 
                className="organic-card hover-lift p-6 select-text"
                style={{
                  borderRadius: "1.2rem 1.5rem 1.1rem 1.8rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <UserCheck className="w-4 h-4" style={{ color: "var(--lavender)" }} />
                  Registration Support
                </h3>
                <div className="font-mono-editorial text-xs flex flex-col gap-1" style={{ color: "var(--ink-mid)" }}>
                  <span>S Harijith Viswanath: +91 79942 74376</span>
                  <span>Nayana Raj: +91 90372 99063</span>
                </div>
              </div>

              {/* Declaration policies */}
              <div 
                className="organic-card hover-lift p-6 select-text"
                style={{
                  borderRadius: "1.8rem 1.4rem 1.6rem 1.2rem",
                  backgroundColor: "var(--moon)",
                  border: "1.5px solid var(--paper-dark)"
                }}
              >
                <h3 className="font-display font-bold text-sm uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2" style={{ fontStyle: "italic", borderColor: "var(--paper-dark)", color: "var(--ink-deep)" }}>
                  <Shield className="w-4 h-4" style={{ color: "var(--rust)" }} />
                  Policy Declaration
                </h3>
                <p className="font-body text-[10px] sm:text-xs leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                  By registering, teams agree to the non-plagiarism rules, academic honor codes, and publication/licensing conditions of the parent society.
                </p>
              </div>

            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
